<template>
  <div>
    <Intro></Intro>

    <About></About>

    <Contact></Contact>
  </div>
</template>

<script>
import Intro from '@/components/Intro'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default {
  components: {
    Intro,
    About,
    Contact,
  },
}
</script>
