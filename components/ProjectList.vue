<template>
  <div class="py-12 text-gray-700">
    <p class="mt-4 text-3xl text-center">
      My work
    </p>

    <div class="container mx-auto flex flex-col items-center mt-12">
      <project-list-entry
        v-for="project in projects"
        :key="project.id"
        :project="project"
      ></project-list-entry>
    </div>
  </div>
</template>

<script>
import ProjectListEntry from '@/components/ProjectListEntry'

export default {
  components: {
    ProjectListEntry
  },

  data: () => ({
    projects: [
      {
        id: 1,
        color: 'bg-red-500',
        image: '/projects/donappetit.png',
        name: 'Don Appetit',
        description: `<p>Don Appetit was created as an entry point for people seeking quality restaurant experience in Czechia and Slovakia.
        With thousands of restaurants in its database, it provides an option to search and preview restaurants, their daily menus, reviews and ratings with a top-notch content management for restaurant owners.</p>
        <p class="mt-4">My job was to analyse and create backend able to handle the complex data model, which, among other things, includes a payment system, analytics, ad module,
        vote systems and both public and backoffice facing interfaces.</p>
        <p class="mt-4">This was all achieved using <strong>Laravel</strong> for the backend and <strong>VueJS</strong> for the frontend, <strong>MySQL</strong> &amp; <strong>Redis</strong> for data storage with <strong>Mailgun</strong> for campaigns and email delivery. All this was then
        hosted on a local redundant infrastructure using <strong>CI/CD</strong> and thanks to our devops management.
        <p class="mt-4">We've spent roughly 2 years developing the service, which is still up and running and being actively maintained with a solid user base.</p>
        `,
        link: 'https://donappetit.sk'
      },
      {
        id: 2,
        color: 'bg-blue-500',
        image: '/projects/sponsoronline.png',
        name: 'Sponsor.Online',
        description: `<p>Sponsor.Online is the ultimate football sponsorship platform. It provides a link between brands and professional football teams, allowing for easier communication and sales between these two parties.</p>
        <p class="mt-4">This project required a very specific configuration, both in terms of backend functionality and user interface. My job was to implement core functionalities for the base platform, companies, teams and sales entities.</p>
        <p class="mt-4">This included everything from a blog to a payment system, chat platform for deals, reach monitoring and much much more.</p>
        <p class="mt-4">We've used <strong>Laravel</strong> for the backend, <strong>NuxtJS</strong> for the frontend with deployment on <strong>Google Cloud</strong>.</p>
        `,
        link: 'https://sponsor.online'
      },
      {
        id: 3,
        color: 'bg-pink-500',
        image: '/projects/socializr.png',
        name: 'Socializr',
        description: `<p>Socializr is a complex set of microservices used to gather and analyse data from social media. As social media is part of our everyday lives, it can provide useful insights into how well products are performing.</p>
        <p class="mt-4">We've developed Socializr to see how people interact and share posts on Facebook, Twitter and Instagram in order to measure their reach, with an ability to filter these data by ages, genders, countries, locales and many more categories.</p>
        <p class="mt-4">The key part of this project was to also analyse the shared content based on <strong>text, images and videos</strong>, using <strong>machine learning</strong> and either text or image recognition.</p>
        <p class="mt-4">All this was achieved by first developing a library per each social network, sharing core functionality but handling different streams of data. These data were then sent via <strong>gRPC</strong> to other tiny Docker microservices to extract basic metrics, including likes, comments and other metadata, while
        a different set of microservies worked to find keywords in text and specific brand logos in images or videos (utilizing <strong>FFMpeg</strong> and key frame extraction). All these data were then sent to <strong>Google Cloud Tasks</strong> to be collected and stored.</p>
        <p class="mt-4">The project itself ended up being constantly improved for effortless maintainability with test coverage at over 95%.</p>
        <p class="mt-4">Deployment was done using Bitbucket's CI/CD capability paired with Google Cloud services.</p>
        `,
        link: null
      },
      {
        id: 4,
        color: 'bg-green-500',
        image: '/projects/dannygo.png',
        name: 'Danny GO travel',
        description: `<p>Danny GO travel is one of the very few companies specifically focused on online travel on Slovak market, offering all inclusive holidays using social media.</p>
        <p class="mt-4">We were tasked to create an online catalogue to allow for an easy way to find a dream destination. This included complex search and filtering features with
        a need for a backend that'd be able to handle flight and hotel reservations.</p>
        <p class="mt-4">After some initial planning, we were able to come up with a subset of data that'd work with 3rd party APIs and we began our work to create and polish every single
        detail to create a platform with a best holiday booking experience. This took almost a year, dozens of liters of coffee and tears, but was worth the result, now that they're sitting at
        4,7 stars rating with almost 400 reviews.</p>
        <p class="mt-4">On the tech side, we've used <strong>Laravel</strong> for the backend and <strong>NodeJS</strong> to communicate with about 10 <strong>3rd party APIs</strong> for flight, hotel and transport bookings.</p>
        `,
        link: 'https://www.dannygo.eu'
      },
      {
        id: 5,
        color: 'bg-purple-500',
        image: '/projects/limedeck.png',
        name: 'LimeDeck',
        description: `<p>LimeDeck is a great tool to organize everything from your everyday life to a set of complex and messy work meetings and tasks and large companies.</p>
        <p class="mt-4">We've spent too much time being annoyed with every single calendar or agenda management tool there is, only to find we're under the same amount of stress and
        in the same disarray of information being thrown at us from every angle.</p>
        <p class="mt-4">LimeDeck comes with a concept called a "Thing". Thing includes anything you need to do during a day, whether it's a time specific meeting with your boss or doing dishes.</p>
        <p class="mt-4">Our intelligent alghoritm works around the clock to score, prioritise and arrange your tasks within your working hours. Need to call your mom to wish her happy birthday? We'll let you know.
        Need to urgently fix that annoying little bug in your latest app? We'll fit that right into your schedule as soon as possible. Are you constantly forgetting to wash your dishes? Yep, it's there.</p>
        <p class="mt-4">LimeDecks core functionality is written in <strong>Laravel</strong>, exposing a clean and well-tested (over 90% test coverage and getting higher every day) <strong>GraphQL API</strong>. The frontend comes written in <strong>NuxtJS</strong>,
        with mobile apps (written in Flutter) coming soon.</p>
        <p class="mt-4">Another great challenge is an upcoming <strong>intelligent text-recognition agent</strong> written in <strong>Go</strong>, allowing users to use natural language to create tasks and events and much more, similar to a smart assistant
        on your phone.</p>
        <p class="mt-4">LimeDeck is currently in a closed beta, scheduled to launch later in 2020.</p>
        `,
        link: 'https://www.limedeck.io'
      },
      {
        id: 6,
        color: 'bg-orange-500',
        image: '/projects/dshorty.png',
        name: 'DShorty',
        description: `<p>DShorty was developed to be (yet another) URL shortener. The goal was to finally have an incredibly lightweight and modern URL application with an ability, well, to shorten links</p>
        <p class="mt-4">Its backend is made in <strong>Go</strong>, having minimal dependencies (using <strong>SQLite 3</strong> for storage with <strong>Gorm as ORM</strong>) and smart in-memory caching, with <strong>Go Gin</strong> as a lightweight router.</p>
        <p class="mt-4">The frontend is written in <strong>NuxtJS</strong>, having only a tiny amount of components for the real "minimalistic" feel. The really nice thing about all this is that the link creation process only takes about 3 miliseconds.</p>
        <p class="mt-4">DShorty is set to be released as an open source project soon, as it still requires some polishing, but it's been used in production for a while without any issues :).</p>
        `,
        link: 'https://www.dshorty.com'
      }
    ]
  })
}
</script>
