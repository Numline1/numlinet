<template>
  <div class="flex flex-col items-center mt-16 text-gray-700">
    <p class="text-3xl">Career</p>

    <div class="container flex flex-col mx-auto mt-16">
      <timeline-list-entry
        v-for="timelineEntry in timelineEntries"
        :key="timelineEntry.slug"
        :timeline-entry="timelineEntry"
      ></timeline-list-entry>
    </div>

    <a class="mt-8" href="/resume.pdf">
      <button class="w-64 px-4 py-2 text-gray-100 bg-primary-gray">
        Download a more detailed resume (PDF)
      </button>
    </a>
  </div>
</template>

<script>
import TimelineListEntry from '@/components/TimelineListEntry'

export default {
  components: {
    TimelineListEntry,
  },

  data: () => ({
    timelineEntries: [
      {
        slug: 'megaverse',
        company: 'Megaverse',
        position: 'Lead engineer',
        hashtags: ['laravel', 'cloud', 'ansible', 'vuejs'],
        quotes: [
          {
            id: 1,
            text:
              'Adult industry is an evergrowing part of the world. Megaverse was made to bring technological innovation and stir the waters, allowing for better experience and monetization of amateur content.',
            reference: {
              icon: '/icons/megaverse.png',
              title: 'megaverse.be',
              subtitle: null,
              url: 'https://megaverse.be',
            },
          },
        ],
      },
      {
        slug: 'donner_consulting_group',
        company: 'Donner Consulting Group',
        position: 'Lead backend engineer',
        hashtags: [
          'golang',
          'microservices',
          'grpc',
          'laravel',
          'graphql',
          'devops',
        ],
        quotes: [
          {
            id: 1,
            text:
              "Martin is a skilled back-end engineer with an eye for tackling edge cases. He proactively embraces new technologies to deliver scalable solutions which don't break easily.",
            reference: {
              icon: '/icons/linkedin.svg',
              title: 'Rudolf Halás',
              subtitle: 'CTO at Donner Consulting Group',
              url: 'https://www.linkedin.com/in/rudolf-halas/',
            },
          },
          {
            id: 2,
            text:
              'Ultimate football sponsorship platform based on Laravel, GraphQL and hosted at Google Cloud.',
            reference: {
              icon: '/icons/sponsoronline.png',
              title: 'sponsor.online',
              subtitle: null,
              url: 'https://sponsor.online',
            },
          },
          {
            id: 3,
            text:
              'Set of microservices written in Go to gather, analyse and process data from social media, including ML, image/video and text recognition.',
            reference: {
              icon: '/icons/go.svg',
              title: 'Socializr',
              subtitle: null,
              url: null,
            },
          },
        ],
      },
      {
        slug: 'kbs_development',
        company: 'KBS Development',
        position: 'Backend engineer',
        hashtags: ['laravel', 'jsonapi', 'nodejs', 'vuejs', 'devops'],
        quotes: [
          {
            id: 1,
            text:
              'Portal for lovers of good food and restaurants with more than 8000 restaurants across Czechia and Slovakia. Based on Laravel, JSON API with ability to pull daily menus, manage or review restaurants.',
            reference: {
              icon: '/icons/donappetit.ico',
              title: 'donappetit.sk',
              subtitle: null,
              url: 'https://donappetit.sk',
            },
          },
          {
            id: 2,
            text:
              'Complete online travel solution, allowing users to book, manage and enjoy their vacation, with more than 400 satisfied customers. Built using Laravel and NodeJS, communicating with several 3rd party booking APIs.',
            reference: {
              icon: '/icons/dannygo.jpg',
              title: 'dannygo.eu',
              subtitle: null,
              url: 'https://www.dannygo.eu',
            },
          },
        ],
      },
      {
        slug: 'hewlett_packard_enterprise',
        company: 'Hewlett Packard Enterprise',
        position: 'Asset management engineer',
        hashtags: ['yii', 'mssql', 'itil'],
        quotes: [
          {
            id: 1,
            text:
              'Improving processes and technology used in large-scale asset management by designing new tools and migrating from obsolete databases to new solutions.',
            reference: {
              icon: '/icons/hpe.ico',
              title: 'hpe.com',
              subtitle: null,
              url: 'https://www.hpe.com',
            },
          },
        ],
      },
      {
        slug: 'adecco_group_ajilon_slovakia',
        company: 'Adecco Group (Ajilon Slovakia)',
        position: 'Linux/Unix support engineer',
        hashtags: ['linux', 'unix', 'hpux', 'aix', 'solaris', 'redhat'],
        quotes: [
          {
            id: 1,
            text:
              'Maintenance of customer servers during day-to-day operations, including incident and change management.',
            reference: {
              icon: '/icons/adecco.png',
              title: 'adecco.sk',
              subtitle: null,
              url: 'https://adecco.sk',
            },
          },
        ],
      },
    ],
  }),
}
</script>
