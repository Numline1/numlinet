<template>
  <div class="mt-24">
    <div class="flex flex-col items-center">
      <p class="px-8 text-6xl font-bold leading-tight text-center">
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
    IntroCode,
  },
}
</script>
