<template>
  <NuxtLink to="/">
    <div class="flex">
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
