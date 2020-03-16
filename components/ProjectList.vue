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
        description: `<p>Don Appetit was created as an entry point for people seeking quality restaurant experience in Czechia and Slovakia.</p>
        <p class="mt-4">We've spent roughly 2 years developing the service based on Laravel, VueJS, MySQL &amp; Redis and GitLab CI/CD. This app was continously deployed to a private cloud.</p>
        `,
        link: 'https://donappetit.sk'
      },
      {
        id: 2,
        color: 'bg-blue-500',
        image: '/projects/sponsoronline.png',
        name: 'Sponsor.Online',
        description: `<p>Sponsor.Online is the ultimate football sponsorship platform. It provides a link between brands and professional football teams, allowing for easier communication and sales between these two parties.</p>
        <p class="mt-4">Overall, this project took about 2 years to develop, using Laravel on the backend, NuxtJS on the frontend and was hosted on Google Cloud, utilizing compute engine, Cloud SQL and Cloud Tasks.</p>
        `,
        link: 'https://sponsor.online'
      },
      {
        id: 3,
        color: 'bg-pink-500',
        image: '/projects/socializr.png',
        name: 'Socializr',
        description: `<p>Socializr is a complex set of microservices used to gather and analyse data from social media.</p>
        <p class="mt-4">Library was created for each supported social network (using either JSON or XML). Gathere data are then sent via <strong>gRPC</strong> to other companion microservices to extract basic metrics, including likes, comments and other metadata.</p>
        <p class="mt-4">A different set of microservies worked to find keywords in text and specific brand logos in images or videos (utilizing <strong>FFMpeg</strong> and key frame extraction). All these data were then sent to <strong>Google Cloud Tasks</strong> to be collected and stored.</p>
        <p class="mt-4">Deployment was done using Bitbucket's CI/CD capability paired with Google Cloud services.</p>
        `,
        link: null
      },
      {
        id: 4,
        color: 'bg-green-500',
        image: '/projects/dannygo.png',
        name: 'Danny GO travel',
        description: `<p>Danny GO travel is one of the very few companies specifically focused on online travel on Slovak market.</p>
        <p class="mt-4">We've worked to implement 3rd party APIs for flight, hotel and transit booking. This was then followed by backend implementation to handle vacation filtering and booking.</p>
        <p class="mt-4">We've used <strong>Laravel</strong> on the backend and <strong>NodeJS</strong> to communicate with booking APIs.</p>
        `,
        link: 'https://www.dannygo.eu'
      },
      {
        id: 5,
        color: 'bg-orange-500',
        image: '/projects/dshorty.png',
        name: 'DShorty',
        description: `<p>DShorty was developed to be (yet another) URL shortener. The goal was to finally have an incredibly lightweight and modern URL application with an ability, well, to shorten links.</p>
        <p class="mt-4">Its backend is made in <strong>Go</strong>, having minimal dependencies (using <strong>SQLite 3</strong> for storage with <strong>Gorm as ORM</strong>) and smart in-memory caching, with <strong>Go Gin</strong> as a lightweight router.</p>
        <p class="mt-4">The frontend is written in <strong>NuxtJS</strong>, having only a tiny amount of components for the real "minimalistic" feel.</p>
        <p class="mt-4">DShorty is set to be released as an <strong>open source</strong> project soon, as it still requires some polishing, but it's been used in production for a while without any issues :).</p>
        `,
        link: 'https://www.dshorty.com'
      }
    ]
  })
}
</script>
