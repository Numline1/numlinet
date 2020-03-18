<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Intro -->
    <Intro></Intro>

    <!-- About -->
    <About></About>

    <!-- Career -->
    <TimelineList></TimelineList>

    <!-- Contact -->
    <Contact></Contact>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Intro from '@/components/Intro'
import About from '@/components/About'
import TimelineList from '@/components/TimelineList'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Intro,
    About,
    TimelineList,
    Contact,
    Footer
  },

  head() {
    return {
      title: 'Numlinet'
    }
  }
}
</script>
