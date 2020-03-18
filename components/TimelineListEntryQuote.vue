<template>
  <div :class="[isEven ? 'justify-end' : 'justify-start']" class="flex w-1/2">
    <div
      :class="[isEven ? 'pr-10 text-right' : 'pl-10 text-left']"
      class="w-2/3 p-8"
    >
      <div
        v-for="quote in timelineEntry.quotes"
        :key="quote.id"
        class="my-2 p-4 bg-gray-200 rounded-md leading-relaxed"
      >
        <p>
          {{ quote.text }}
        </p>
        <div>
          <div class="flex">
            <img :src="quote.reference.icon" :alt="timelineEntry.name" />
            <p class="mt-4 font-bold">{{ quote.reference.title }}</p>
          </div>
          <p>{{ quote.reference.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timelineEntry: {
      type: Object,
      required: true
    },
    isEven: {
      type: Boolean,
      required: true
    }
  }
}
</script>
