<template>
  <div class="flex flex-col items-center m-16">
    <img class="h-24 w-24" :src="technology.icon" :alt="technology.name" />

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
