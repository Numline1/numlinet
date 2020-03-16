<template>
  <div class="bg-nn-primary py-12 text-gray-400">
    <p class="mt-4 text-3xl text-center">
      The road so far...
    </p>

    <div class="container mx-auto flex flex-col items-center mt-12">
      <timeline-list-entry
        v-for="timelineItem in timelineItems"
        :key="timelineItem.id"
        :timeline-item="timelineItem"
        :active-id="activeId"
        @click.native="activeId = timelineItem.id"
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
    activeId: 0,
    timelineItems: [
      {
        id: 1,
        position: 'Born',
        description: null,
        company: null,
        bar: {
          height: 'h-2',
          color: 'bg-red-800'
        }
      },
      {
        id: 2,
        position: 'Unix & Linux Administrator',
        description: 'Lorem ipsum dolor sit amet.',
        company: 'Ajilon',
        bar: {
          height: 'h-16',
          color: 'bg-red-500'
        }
      },
      {
        id: 3,
        position: 'Backend & SQL engineer in Asset Management',
        description: 'Lorem ipsum dolor sit amet.',
        company: 'HP/HPE',
        bar: {
          height: 'h-16',
          color: 'bg-orange-500'
        }
      },
      {
        id: 4,
        position: 'Backend engineer & web developer',
        description: 'Lorem ipsum dolor sit amet.',
        company: 'KBS Development',
        bar: {
          height: 'h-16',
          color: 'bg-orange-300'
        }
      },
      {
        id: 5,
        position: 'Lead backend engineer & devops engineer',
        description: 'Lorem ipsum dolor sit amet.',
        company: 'DCG',
        bar: {
          height: 'h-16',
          color: 'bg-yellow-200'
        }
      },
      {
        id: 6,
        position: 'Now',
        description: null,
        company: null,
        bar: {
          height: 'h-16',
          color: 'bg-green-400'
        }
      }
    ]
  })
}
</script>
