<template>
  <div
    :class="[isEven ? 'md:justify-end' : 'md:justify-start']"
    class="flex md:w-1/2"
  >
    <div
      :class="[
        isEven ? 'px-4 md:pr-10 md:text-right' : 'px-4 md:pl-10 md:text-left'
      ]"
      class="md:w-2/3 md:p-8"
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
          <a :href="quote.reference.url" target="_blank">
            <div class="flex items-center mt-4">
              <img
                class="h-4 w-4 mr-1"
                :src="quote.reference.icon"
                :alt="quote.reference.title"
              />
              <p class="font-bold">{{ quote.reference.title }}</p>
            </div>
          </a>
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
