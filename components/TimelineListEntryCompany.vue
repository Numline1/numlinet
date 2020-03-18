<template>
  <div
    :class="[
      isEven
        ? 'pl-8 border-l items-start -ml-1'
        : 'pr-8 border-r items-end -mr-1'
    ]"
    class="relative flex flex-col w-1/2 p-4 border-black border-dashed"
  >
    <div
      :class="[isEven ? 'timeline-dot-left' : 'timeline-dot-right']"
      class="h-4 w-4 bg-black rounded"
    ></div>
    <p class="font-bold text-2xl">{{ timelineEntry.company }}</p>
    <p class="text-lg text-gray-500">{{ timelineEntry.position }}</p>
    <div
      :class="[isEven ? 'justify-start' : 'justify-end']"
      class="flex flex-wrap mt-6 w-2/5"
    >
      <p
        v-for="hashtag in timelineEntry.hashtags"
        :key="hashtag"
        :class="[isEven ? 'mr-2' : 'ml-2']"
        class="ml-2"
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
