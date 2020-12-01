<template>
  <div class="w-full">
    <p class="p-4 text-sm text-center bg-gray-100">
      &copy; {{ year }} Martin Krajcovic
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    year: new Date().getFullYear(),
  }),
}
</script>
