<template>
  <div>
    <p class="p-4 text-center text-gray-700">
      &copy; {{ year }} Martin Krajcovic
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    year: new Date().getFullYear()
  })
}
</script>
