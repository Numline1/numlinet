<template>
  <div class="mt-24">
    <div class="flex flex-col items-center">
      <p
        class="md:w-2/5 leading-tight px-8 text-2xl md:text-6xl font-bold text-center"
      >
        Your very own backend software engineer
      </p>

      <p class="mt-16 md:w-1/3 text-xl md:text-2xl text-center text-gray-700">
        Designing and creating stable, scalable, maintainable and tested
        software
      </p>

      <IntroCode></IntroCode>
    </div>
  </div>
</template>

<script>
import IntroCode from '@/components/IntroCode'

export default {
  components: {
    IntroCode
  }
}
</script>
