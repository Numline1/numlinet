<template>
  <div class="flex w-full mb-16 pb-16 border-b">
    <div class="mr-4 w-1/2">
      <p class="px-4 text-2xl">{{ project.name }}</p>

      <!-- eslint-disable-next-line -->
      <div class="mt-4 px-4 text-justify" v-html="project.description"></div>

      <div v-if="project.link" class="mt-4 px-4">
        <a
          class="font-bold text-blue-500"
          :href="project.link"
          target="_blank"
          >{{ friendlyLink(project.link) }}</a
        >
      </div>
    </div>

    <div class="rounded self-center w-1/2" :class="`bg-${project.color}`">
      <img class="pl-2 pt-2" :src="project.image" :alt="project.name" />
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
  },
  methods: {
    friendlyLink(parameter) {
      let friendlyLink

      friendlyLink = parameter.replace('https://', '')
      friendlyLink = friendlyLink.replace('http://', '')

      return friendlyLink
    }
  }
}
</script>
