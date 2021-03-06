<template>
  <div class="container px-4 mx-auto md:grid md:grid-cols-5 md:gap-24">
    <article class="col-span-3">
      <h1 class="mb-2 text-3xl">{{ article.title }}</h1>

      <p
        class="mb-8 text-sm text-gray-700"
        :title="article.publishedAt | extendedDateAndTime"
      >
        Published {{ article.publishedAt | diffForHumans }}
      </p>

      <nuxt-content class="text-lg leading-8" :document="article" />
    </article>
    <div class="col-span-2">
      <h2 class="text-xl uppercase">Latest articles</h2>
      <ul v-if="latestArticles.length" class="mt-4 space-y-2">
        <li v-for="article in latestArticles" :key="article.slug">
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          >
            {{ article.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  filters: {
    diffForHumans: (date) => {
      if (!date) {
        return null
      }

      return dayjs(date).fromNow()
    },
    extendedDateAndTime: (date) => {
      if (!date) {
        return null
      }

      return dayjs(date).format('MMM D YYYY - h:mA')
    },
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const latestArticles = await $content('articles')
      .where({
        publishedAt: { $lt: Date.now() },
      })
      .only(['title', 'slug'])
      .sortBy('publishedAt', 'desc')
      .fetch()

    return {
      article,
      latestArticles,
    }
  },
  head() {
    return { title: this.article.title + ' | ' + process.env.npm_package_name }
  },
  created() {
    dayjs.extend(relativeTime)
  },
}
</script>

<style>
.nuxt-content h2 {
  @apply text-2xl mt-12 mb-6;
}

.nuxt-content p {
  @apply my-6;
}

.nuxt-content a {
  @apply border-b border-primary-gray border-dashed text-gray-900;
}

.nuxt-content ul {
  @apply ml-4 list-disc;
}

.nuxt-content ol {
  @apply ml-4 list-decimal;
}

.nuxt-content code {
  @apply rounded mx-1 p-1 bg-gray-200 text-red-900;
}

.nuxt-content pre {
  @apply pb-10 bg-gray-200 text-sm;
}

.nuxt-content pre code {
  @apply px-0 ml-0;
}

.nuxt-content-highlight {
  @apply relative;
}

.nuxt-content-highlight .filename {
  @apply absolute right-0 bottom-0 text-gray-600 font-light z-10 mr-2 mb-2 text-sm;
}
</style>
