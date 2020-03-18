<template>
  <div class="mt-32">
    <div class="flex flex-col items-center">
      <p class="leading-tight px-8 text-6xl font-bold text-center">
        Senior backend
        <br />
        engineer
      </p>

      <p class="mt-16 text-2xl text-center text-gray-700">
        Designing and creating stable, scalable, maintainable
        <br />
        and tested software
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
