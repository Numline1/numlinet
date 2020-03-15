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
        projectLogo: '/logos/donappetit.png',
        projectImage: '/projects/donappetit.png',
        name: 'Don Appetit',
        description: `<p>Don Appetit was created as an entry point for people seeking quality restaurant experience in Czechia and Slovakia.
        With thousands of restaurants in its database, it provides access to search and daily menus to customers and top-notch content management for restaurant owners.</p>
        <p class="mt-4">My job was to analyse and create backend able to handle the complex data model, which, among other things, includes a payment system, analytics, ad module,
        vote systems and both public and backoffice facing interfaces.</p>
        <p class="mt-4">This was all achieved using Laravel for the backend and VueJS for the frontend, MySQL &amp; Redis for data storage, Mailgun for campaigns. All this was then
        hosted on a local redundant infrastructure using CI/CD and thanks to our devops management.
        `,
        link: 'https://donappetit.sk'
      },
      {
        id: 2,
        projectLogo: '/logos/sponsoronline.png',
        projectImage: '',
        name: 'Sponsor.Online',
        description: null,
        link: 'https://sponsor.online'
      },
      {
        id: 3,
        projectLogo: '',
        projectImage: '',
        name: 'Socializr',
        description: null
      },
      {
        id: 4,
        projectLogo: '/logos/dannygotravel.png',
        projectImage: '',
        name: 'Danny GO travel',
        description: null
      },
      {
        id: 5,
        projectLogo: '',
        projectImage: '',
        name: 'DShorty',
        description: null
      }
    ]
  })
}
</script>
