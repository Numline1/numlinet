<template>
  <div
    :class="[
      isEven
        ? 'md:pl-10 md:border-l md:items-start -ml-1'
        : 'md:pr-10 md:border-r md:items-end -mr-1'
    ]"
    class="relative flex flex-col md:w-1/2 p-4 md:p-8 border-black border-dashed"
  >
    <div
      :class="[isEven ? 'timeline-dot-left' : 'timeline-dot-right']"
      class="h-4 w-4 bg-black rounded hidden md:block"
    ></div>
    <p class="font-bold text-2xl">{{ timelineEntry.company }}</p>
    <p class="text-lg text-gray-500">{{ timelineEntry.position }}</p>
    <div
      :class="[isEven ? 'md:justify-start' : 'md:justify-end']"
      class="flex flex-wrap mt-2 md:mt-6 w-2/5"
    >
      <p
        v-for="hashtag in timelineEntry.hashtags"
        :key="hashtag"
        :class="[isEven ? 'mr-2 md:mr-2' : 'mr-2 md:ml-2']"
      >
        #<span class="text-gray-600">{{ hashtag }}</span>
      </p>
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

<style scoped>
.-mr-1 {
  margin-right: -1px;
}

.-ml-1 {
  margin-left: -1px;
}

.timeline-dot-right {
  position: absolute;
  top: 28px;
  right: -8px;
}

.timeline-dot-left {
  position: absolute;
  top: 28px;
  left: -8px;
}
</style>
