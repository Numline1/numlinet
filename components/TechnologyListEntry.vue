<template>
  <div class="flex flex-col items-center mx-8 mb-16 w-24">
    <img :src="technology.icon" :alt="technology.name" />

    <p class="pt-4 font-bold text-center">{{ technology.name }}</p>
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
