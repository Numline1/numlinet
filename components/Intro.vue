<template>
  <div class="mt-32">
    <div class="flex flex-col items-center">
      <p class="w-2/5 leading-tight px-8 text-6xl font-bold text-center">
        Senior backend engineer
      </p>

      <p class="mt-16 w-1/3 text-2xl text-center text-gray-700">
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
