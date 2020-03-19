<template>
  <div class="mt-16 text-gray-700">
    <p class="text-3xl text-center">
      Career
    </p>

    <div class="container mx-auto flex flex-col mt-16">
      <timeline-list-entry
        v-for="timelineEntry in timelineEntries"
        :key="timelineEntry.id"
        :timeline-entry="timelineEntry"
      ></timeline-list-entry>
    </div>
  </div>
</template>

<script>
import TimelineListEntry from '@/components/TimelineListEntry'

export default {
  components: {
    TimelineListEntry
  },

  data: () => ({
    timelineEntries: [
      {
        id: 1,
        company: 'Donner Consulting Group',
        position: 'Lead backend engineer',
        hashtags: [
          'golang',
          'microservices',
          'grpc',
          'laravel',
          'graphql',
          'devops'
        ],
        quotes: [
          {
            id: 1,
            text: 'Lorem ipsum dolor sit amet',
            reference: {
              icon: '/icons/linkedin.svg',
              title: 'Rudolf Halás',
              subtitle: 'CTO at Donner Consulting Group',
              url: 'https://www.linkedin.com/in/rudolf-halas/'
            }
          },
          {
            id: 2,
            text:
              'Ultimate football sponsorship platform based on Laravel, GraphQL and hosted at Google Cloud.',
            reference: {
              icon: '/icons/sponsoronline.png',
              title: 'sponsor.online',
              subtitle: null,
              url: 'https://sponsor.online'
            }
          },
          {
            id: 3,
            text:
              'Set of microservices written in Go to gather, analyse and process data from social media, including ML, image/video and text recognition.',
            reference: {
              icon: '/icons/go.svg',
              title: 'Socializr',
              subtitle: null,
              url: null
            }
          }
        ]
      },
      {
        id: 2,
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
              url: 'https://donappetit.sk'
            }
          },
          {
            id: 2,
            text:
              'Complete online travel solution, allowing users to book, manage and enjoy their vacation, with more than 400 satisfied customers. Built using Laravel and NodeJS, communicating with several 3rd party booking APIs.',
            reference: {
              icon: '/icons/dannygo.jpg',
              title: 'dannygo.eu',
              subtitle: null,
              url: 'https://www.dannygo.eu'
            }
          }
        ]
      },
      {
        id: 3,
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
              url: 'https://www.hpe.com'
            }
          }
        ]
      },
      {
        id: 4,
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
              url: 'https://adecco.sk'
            }
          }
        ]
      }
    ]
  })
}
</script>
