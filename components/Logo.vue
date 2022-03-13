<template>
  <NuxtLink to="/">
    <div class="flex items-center">
      <p class="mr-2" title="Slava Ukrajini">🇺🇦</p>
      <h1>Numlinet</h1>
      <div class="blinking">_</div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.blinking {
  animation: blinking 1s linear infinite;
}

@keyframes blinking {
  50% {
    opacity: 0;
  }
}
</style>
