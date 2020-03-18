<template>
  <div>
    <p class="p-4 text-center text-sm bg-gray-100">
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
