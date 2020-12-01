<template>
  <div>
    <Intro></Intro>

    <About></About>

    <TimelineList></TimelineList>

    <Contact></Contact>
  </div>
</template>

<script>
import Intro from '@/components/Intro'
import About from '@/components/About'
import TimelineList from '@/components/TimelineList'
import Contact from '@/components/Contact'

export default {
  components: {
    Intro,
    About,
    TimelineList,
    Contact,
  },
}
</script>
