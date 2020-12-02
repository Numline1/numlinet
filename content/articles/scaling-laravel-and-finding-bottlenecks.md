---
title: Scaling Laravel and finding bottlenecks
description: Technical analysis of Laravel scaling and a story about bottleneck search, Nginx & PHP-FPM stack optimization and ad-hoc devops
imgSmall: /content/scaling-laravel-and-finding-bottlenecks/img_small.jpg
---

Scaling applications can be a daunting task, especially with PHP. This is not going to be an article about "why PHP sucks", but rather a lengthy journal of many steps taken by a team of developers to optimize an app written using PHP (and Laravel). The end result would likely be the same here, no matter what language or framework was used, even though PHP can be the bottleneck in many cases similar to ours.

Identifying where the weakest point of the chain is and understanding why it's not performing the way you were hoping for can take days. Even if you like to play doctor (that'd be a devopsologist in this case), it can easily turn into a spiral of dread, sleepless nights and tears. Thankfully, we at Megaverse, didn't progress into that state, although nobody knows what couple of more days would've done to our sanity.

## Our scenario

After many months of development, we've finally managed to release a new major version of our app. Our product is a website focused on adult industry (we're being PG13 here, no links, sorry). 

Endless days & nights were spent testing, debugging and fixing bugs before the release. Each time we thought we reached the end, new collection of bugs appeared in Jira and we continued the cycle. Unfortunately for us, we never really gave much thoughts to scaling and performance testing. After all, our current release never really had any issues with around 700 live visitors and we were cozy with our single-user dev environments.

The D-day was here, we started our marketing plot and soon had 3000 people online...

## What happened next...

With 3000 people online, we've noticed an increased error rate, with "504" responses being thrown by Cloudflare. Strange, we thought, server CPUs were barely busy, RAM was okay, the IO was insignificant. We run 3 webserver nodes behind a loadbalancer on DigitalOcean, using Nginx as a reverse proxy for PHP FPM 7.4. To accompany this setup, we have several worker and scheduler nodes - these do not directly interact with our users. These secondary nodes are responsible for our queues and crons, which tend to process around 10 to 15 thousand jobs every minute. They're usually just playing with a our managed Redis and MySQL services - also offered by DigitalOcean.

As I've mentioned, our infrastructure is also covered by a Cloudflare proxy. We naively believed we're safe from any amount of visitors (with CDNs and caching), yet as the error rate was increasing, pages were becoming slower and slower (the average load of a single page skyrocketed to 60 seconds, which is our fastcgi timeout limit). Were we under attack or just painfully unprepared?

## Investigating

Our dev team decided to double as a baby devops squad and we were looking to take couple of hours to figure this out. Spoiler alert - it took almost 4 days. We moved to our staging environment, which is the closest we have to our production. We obviously didn't want to debug with live users, although we've stopped pushing ads and traffic in the meantime and site load time stabilized back to 1-2 seconds.

The first step was to look at the logs. We aggregate everything to Datadog and with simple math (3000 users divided by 3 servers equals 1000 users per server), we figured out that this was an issue on our servers, not Cloudflare or DigitalOcean loadbalancer. With Round-robin algorithm we were distributing the load and at these numbers, Cloudflare doesn't impose any relevant limits on connections and DigitalOcean seems to be limited to 10000 (this is something we'll have to figure out in the future). There was also no sign of an attack of any sort.

Upon seeing the Nginx logs however, it was obvious that something funky was going on:

```[/var/nginx/error.log]
2020/11/27 13:30:47 [error] 2371#2371: *114153 upstream timed out (110: Connection timed out) while reading response header from upstream, client: 123.123.123.123, server: oursite.tld, request: "GET /videos?someparams=123 HTTP/1.1", upstream: "fastcgi://unix:/run/php/php-fpm.sock", host: "oursite.tld"
```

PHP FPM log, on the other hand, had nothing interesting inside, just regular notices of FPM children being recycled

```[/var/log/php7.4-fpm.log]
[28-Nov-2020 16:38:30] NOTICE: [pool www] child 24925 exited with code 0 after 4852.680364 seconds from start
[28-Nov-2020 16:38:30] NOTICE: [pool www] child 6893 started
```

At Megaverse, we deploy our servers using Ansible. The first thought was to start with our custom webserver and php fpm config templates. It seemed like an FPM issue, we thought "the spawned children in our pool are just not enough". Errors listed above generally indicate the FPM service didn't respond to Nginx within 60 seconds, or whatever the amount used for fastcgi timeout is.

## Stage 1: Denial (of service)

No developer ever likes to think their application might be "the issue". In retrospect, we were in deep denial. As we were looking into all other options, we started benchmarking using [Apache Benchmark](https://httpd.apache.org/docs/2.4/programs/ab.html) and [Apache JMeter](https://jmeter.apache.org/). The results always seemed promising for a brief moment, until suddenly all of the requests started failing, the `110: Connection timed out` error came back and our site became unresponsive. In other words, all was great, until it wasn't.

We've abandoned Apache Benchmark (ab) fairly quickly as we realized it might be a great tool for quick tests, it's not viable to have to figure out ways to mark requests manually as failed and create charts with `gnuplot`. Apache JMeter was suggested as a more advanced alternative. We had to adjust our benchmarks several times, as we were hitting various limits (ISP throttling, crashing local DNS servers etc.), however each section in this article mentions the parameters used for that specific test.

Default test was performed on staging to serve as a baseline for any further tests, although these changed slightly over the time.

JMeter results: 1750 samples with 350 user concurency - 50.51% error rate, average response time 9929ms. Requests were marked as failed if the server didn't send a success response within 8 seconds.

[![Baseline test results](/content/scaling-laravel-and-finding-bottlenecks/jmeter_1_baseline.png "Baseline test results")](https://numli.net/content/scaling-laravel-and-finding-bottlenecks/jmeter_1_baseline.png)

The chart above displays the overall average response time for a request. We suspected the request queue got full initially and as the server started processing the requests, it sped up slightly. Something was obviously throttling the amount of requests the server was able to handle.

## Stage 2: Updating dependencies

Our first attempt at fixing this mess was looking at the installed system packages. PHP's been known to [segfault with trivial things like arrays](https://bugs.php.net/bug.php?id=73168) and I've personally experienced a similar issue with early versions of PHP 7. We all knew deep inside it was unlikely, but it never hurts to try. Sure enough, we ran `apt upgrade` on the staging cluster and had no luck in terms of speed or general througput.

*Conclusion: Keep your servers up-to-date, it might not be the silver bullet but with major security vulnerabilities, it's still an important step.*

## Stage 3: Back to blaming Nginx

Although we had our Nginx fairly optimized over the years, we never really encountered a situation where our site was  "just too successful". Google results offered some generic answers on how to scale, although nothing quite similar to our case. 

We've added "keepalive" settings between our Nginx servers and FPM pools. We did this incorrectly, but more on that later.

```nginx[/etc/nginx/sites-enabled/oursite.tld]
location ~ \.php$ {
    include /etc/nginx/fastcgi_params;
    fastcgi_pass phpfpm;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    // The line below has been added
    fastcgi_keep_conn on;
}
```

```nginx[/etc/nginx/nginx.conf]
upstream phpfpm {
    server         unix:/run/php/php-fpm.sock;
    // The line below has been added
    keepalive 30;
}
```

while we were at it, we also increased the amount of children our static FPM pool spawns by default, from 25 to 40

```ini[/etc/php/7.4/fpm/pool.d/www.conf]
pm.max_children = 40
```

*Conclusion: This didn't really have the impact we were hoping for. It made things way worse.*

JMeter results: 1750 samples with 350 user concurency - 84.86% error rate, average response time 566ms. Requests were marked as failed if the server didn't send a success response within 8 seconds.

These numbers told us that while we managed to increase the througput for our servers, we just allowed for more 5xx errors to flow through. As if that wasn't enough, the charts we were getting were making no sense to us. The server initially rejected most of the requests, then went to serve and render the rest with a significant delay.

## Stage 4: This is getting silly

With no significant improvement in sight, we went and deployed some other changes:

***/etc/nginx/nginx.conf***
* `worker_connections` was set to 2048. Originall at 1024, this corresponded with our initial observations of the issues starting at around 1000 users per server
* `keepalive_requests` was set to 2048. his marks how many requests will be served in a single "keepalive" connection.
* `gzip_static` was set to on. This enables caching of static files (like JS and CSS) into .gz files instead of re-compressing them for each request.

***/etc/php/7.4/fpm/php.ini***
* `opcache.memory_consumption` was set to 512. Some articles suggested this might help the performance, so we've increased it from original 128 (MB) to 1024 and later decreased it down to 512, as it had no significant impact.

***/etc/php/7.4/fpm/pool.d/www.conf***
* `listen.backlog` was set to 3072. This setting was originally commented out and according to the docs, it defaults to 511. It should mark the backlog FPM is able to "hold" while it's processing other requests.
* `pm.max_requests` was set to 2048. This value marks how many requests will be served by a single fpm child before it gets recycled. We originally had this value at 500. As it turns out, it is recommended to keep this in sync with Nginx's `keepalive_requests` to avoid having keepalive connections die when a child is recycled.

Our complete Nginx and PHP configs can be found at the bottoom of this article.

*Conclusion: Not quite there yet...*

We decided to increase the amount of cycles in JMeter to 7000 to obtain more data after these changes. The error rate dropped to 48.67% with average response time at 7917ms. These numbers were still insane, but we were not going for great response times, nor were we trying to compare this to the real world. With 3000 users online, you don't expect all of them to make a request every second. Our idea was to establish a baseline for testing.

The JMeter response time chart was still all over the place, but the spike flattened a little.

[![Test results after changes to Nginx and FPM](/content/scaling-laravel-and-finding-bottlenecks/jmeter_2_changes_to_nginx_and_php.png "Test results after changes to Nginx and FPM")](https://numli.net/content/scaling-laravel-and-finding-bottlenecks/jmeter_2_changes_to_nginx_and_php.png)

## Stage 5: Back to basics

Our operating system was already well optimized for high amount of connections. We're using Ubuntu 18.04 LTS servers with some changes to sysctl.conf (complete file down below). At this point, I decided to snatch one of our staging servers out of the loadbalancer pool and run a manual upgrade (we're usually using Terragrunt and Packer, but I was in no mood to get myself familiar with them). Originally, these servers were running with 2 CPU cores and 4GB of RAM. The temporary upgrade boosted this specific node to 8 cores and 16GB of RAM. I've also increased `net.core.somaxconn` to 8192 (originally 4096), to allow for more network connections and to eliminate any doubts.

*Conclusion: This decreased the error rate somewhat, but with pretty much all server configuration options we could think of being exhausted, we knew there's something wrong with the app itself.*

The added cores weren't particularly busy, RAM was chilling.

JMeter results showed a slightly decreased error rate. With roughly 6000 samples, the error rate was at 15.27%, response times were averaging at 12350ms.

[![HTOP cores after server boost](/content/scaling-laravel-and-finding-bottlenecks/htop_after_server_boost.png "HTOP cores after server boost")](https://numli.net/content/scaling-laravel-and-finding-bottlenecks/htop_after_server_boost.png)

## Stage 6: Let's benchmark again

One of our last ideas was to enable FPM slowlog. We've applied a simple change:

```ini[/etc/php/7.4/fpm/pool.d/www.conf]
slowlog = /var/log/$pool.log.slow
request_slowlog_timeout = 10s
```

which started logging every execution in our pool that took over 10 seconds. These logs were then aggregated to Datadog, as we started benchmarking with JMeter. We knew JMeter was just applying a synthetic load on our servers, as we didn't really have a chance to figure out how to simulate a regular user behavior. Pushing the servers with 500 simulated users and 10 cycles revealed certain improvements but had results which resembled our original issues. As more requests were pushed, more and more responses came with 504 HTTP code. 

We were clueless as to what else could possibly be slowing us down. Upon looking at the FPM slowlogs, we slowly (pun intended) started revisiting stage 2 - denial. Although no pattern was obvious at first, one of our colleagues noticed PHPRedis being mentioned one too many times. Could it be? Was the problem in our app this entire time? Yes.

```ini[/var/log/www.log.slow]
[27-Nov-2020 13:20:11]  [pool www] pid 13873
script_filename = /home/oursite/www/current/public/index.php
[0x00007f5ab5c13b90] hasMacro() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Redis/Connections/Connection.php:216
[0x00007f5ab5c13b10] __call() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Redis/Connections/PhpRedisConnection.php:580
[0x00007f5ab5c13a60] __call() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Cache/RedisStore.php:93
[0x00007f5ab5c139c0] put() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Cache/Repository.php:211
[0x00007f5ab5c13910] put() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Session/CacheBasedSessionHandler.php:66
[0x00007f5ab5c13880] write() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Session/Store.php:129
[0x00007f5ab5c13820] save() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:231
[0x00007f5ab5c137b0] saveSession() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:125
[0x00007f5ab5c13710] handleStatefulRequest() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:62
[0x00007f5ab5c13660] handle() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:167
[0x00007f5ab5c13580] Illuminate\Pipeline\{closure}() /home/oursite/www/releases/70/vendor/fruitcake/laravel-cors/src/HandleCors.php:37
[0x00007f5ab5c134d0] handle() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:167
[0x00007f5ab5c133f0] Illuminate\Pipeline\{closure}() /home/oursite/www/releases/70/vendor/fideloper/proxy/src/TrustProxies.php:57
[0x00007f5ab5c13350] handle() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:167
[0x00007f5ab5c13270] Illuminate\Pipeline\{closure}() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:103
[0x00007f5ab5c131f0] then() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:140
[0x00007f5ab5c13170] sendRequestThroughRouter() /home/oursite/www/releases/70/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:109
[0x00007f5ab5c130d0] handle() /home/oursite/www/releases/70/public/index.php:56
```

[PHPRedis](https://github.com/phpredis/phpredis) is a Redis client library used to interact with Redis instances or clusters. Unlike [Predis](https://github.com/predis/predis), it uses a C extension in PHP, which tends to make it a more scalable alternative.

This was a chicken and an egg situation. We didn't know whether this was an error that was causing the slowdown or a result of the slowdown. Our hosted Redis didn't seem particularly busy, but what if the sheer amount of connections users were making was a problem?

Well, as it turns out, yes again. Laravel has a configuration option for PHPRedis, that can be found in `./config/database.php` in the `redis` section, called `persistent`. A good thing to know here is that even though PHP is inherently stateless, FPM can certainly keep some state. Within a regular PHP request cycle, the application receives a request, boots up, prepares a response and then is no more. With this setting, we were able to let PHP remain connected to our Redis server and let the Redis server do it's job instead of handling the overhead of opening new connections for each page load.

After setting `persistent` to `true`, the change was immediately visible.

We re-verified this by temporarily changing the session store and cache to `file` driver, rather than the `redis` driver and the results were still amazing. The error rate and response time dropped to 0.03% and 3730ms respectively.

Ironically, the amount of Redis clients connected has roughly doubled.

[![Redis clients after persistent was enabled](/content/scaling-laravel-and-finding-bottlenecks/redis_clients_after_persistent_change.png "Redis clients after persistent was enabled")](https://numli.net/content/scaling-laravel-and-finding-bottlenecks/redis_clients_after_persistent_change.png)

## Closing note and conclusions

So what was the real problem here? And why do we still have a 0.3% error rate?

Well, Redis itself was not the problem. Even though the amount of connections has doubled, the througput has tripled. The very likely conclusion is that either PHP, its Redis extension, operating system or our network stack wasn't able to keep up with the amount of connections being opened and caused havoc when the queue with TCP connections increased. It's also worth mentioning the Redis instance itself wasn't reporting any slowdowns and its stats were stable.

It's reasonable to conclude this was an oversight on our end.

We're also not even remotely done. Although the 0.3% error rate was achieved using a synthetic test (in reality, Cloudflare would never allow a single user to hammer the website the way we did), it allowed us to uncover other problems like a similar issue with MySQL or exceptions thrown by the Laravel router. We're also hoping to start using HTTP/2, reduce the amount of assets loaded for each request and perhaps look into [PHP preloading](https://www.php.net/manual/en/opcache.preloading.php).

After we've deployed to production again, we started pushing ads and monitor the real time performance. The limit this time was 10000 users online, giving us roughly 7000 additional users over the original configuration. We've started noticing an increasing error rate at this number again, however this was a combination of CPUs being fully utilized and perhaps some non-optimal code as well.

We're hoping to continue this path and who knows, maybe conquer the 10000 users per server mark.

Configuration files mentioned in this article:
* [/etc/nginx/nginx.conf](/content/scaling-laravel-and-finding-bottlenecks/nginx.conf.txt)
* [/etc/nginx/sites-enabled/oursite](/content/scaling-laravel-and-finding-bottlenecks/oursite.txt)
* [/etc/php/7.4/fpm/php.ini](/content/scaling-laravel-and-finding-bottlenecks/php.ini.txt)
* [/etc/php/7.4/fpm/php-fpm.conf](/content/scaling-laravel-and-finding-bottlenecks/php-fpm.conf.txt)
* [/etc/php/7.4/fpm/pool.d/www.conf](/content/scaling-laravel-and-finding-bottlenecks/www.conf.txt)
* [/etc/sysctl.conf](/content/scaling-laravel-and-finding-bottlenecks/sysctl.conf.txt)

*Special thanks to Megaverse and my colleagues for making this article possible and providing support and data. Also a special thanks to my IRC comrades for proofreading an early edition of this article and providing valuable feedback!*
*Title image used is by [Michal Jarmoluk](https://pixabay.com/users/jarmoluk-143740/) from [Pixabay](https://pixabay.com/). Thank you.*
