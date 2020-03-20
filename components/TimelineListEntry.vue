<template>
  <div>
    <div v-if="isEven" class="flex flex-col-reverse md:flex-row w-full">
      <timeline-list-entry-quote
        v-if="timelineEntry.id % 2 === 0"
        :timeline-entry="timelineEntry"
        :is-even="isEven"
      ></timeline-list-entry-quote>
      <timeline-list-entry-company
        v-if="timelineEntry.id % 2 === 0"
        :timeline-entry="timelineEntry"
        :is-even="isEven"
      ></timeline-list-entry-company>
    </div>

    <div v-if="!isEven" class="flex flex-col md:flex-row w-full">
      <timeline-list-entry-company
        v-if="timelineEntry.id % 2 !== 0"
        :timeline-entry="timelineEntry"
        :is-even="isEven"
      ></timeline-list-entry-company>
      <timeline-list-entry-quote
        v-if="timelineEntry.id % 2 !== 0"
        :timeline-entry="timelineEntry"
        :is-even="isEven"
      ></timeline-list-entry-quote>
    </div>
  </div>
</template>

<script>
import TimelineListEntryCompany from '@/components/TimelineListEntryCompany'
import TimelineListEntryQuote from '@/components/TimelineListEntryQuote'

export default {
  components: {
    TimelineListEntryCompany,
    TimelineListEntryQuote
  },

  props: {
    timelineEntry: {
      type: Object,
      required: true
    }
  },

  computed: {
    isEven() {
      return this.timelineEntry.id % 2 === 0
    }
  }
}
</script>
