<template>
  <div class="flex flex-col items-center mt-16 w-1/4">
    <img class="w-1/4" :src="technology.icon" :alt="technology.name" />

    <p class="pt-4 font-bold">{{ technology.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    technology: {
      type: Object,
      required: true
    }
  }
}
</script>
