<template>
  <div class="flex flex-col items-center">
    <div
      class="w-2"
      :class="[timelineItem.bar.height, timelineItem.bar.color]"
    ></div>

    <p
      :class="{
        'cursor-pointer md:border-b md:border-dashed': timelineItem.description
      }"
      class="m-4 text-center"
    >
      <strong>{{ timelineItem.position }}</strong>
      <span v-if="timelineItem.company">@ {{ timelineItem.company }}</span>

      <span v-if="timelineItem.description === null"></span>
      <span v-else-if="activeId === timelineItem.id">&#9662;</span>
      <span v-else>&#9656;</span>
    </p>
    <p v-if="activeId === timelineItem.id" class="mb-4 text-gray-500">
      {{ timelineItem.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    timelineItem: {
      type: Object,
      required: true
    },
    activeId: {
      type: Number,
      default: 0
    }
  }
}
</script>
