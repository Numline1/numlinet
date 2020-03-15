<template>
  <div class="flex w-full mb-16">
    <div class="pt-2 px-4 w-16">
      <img :src="project.projectLogo" :alt="project.name" />
    </div>

    <div class="w-1/2">
      <p class="px-4 text-2xl">{{ project.name }}</p>

      <!-- eslint-disable-next-line -->
      <div class="mt-4 px-4 text-justify" v-html="project.description"></div>
    </div>

    <div class="self-center w-1/2">
      <img :src="project.projectImage" :alt="project.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>
