<template>
  <div>
    <!-- Header -->
    <Header></Header>

    <!-- Intro -->
    <Intro></Intro>

    <!-- About -->
    <About></About>

    <!-- Tech stack -->
    <TechnologyList></TechnologyList>

    <!-- The road so far -->
    <TimelineList></TimelineList>

    <!-- My work -->
    <ProjectList></ProjectList>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Intro from '@/components/Intro'
import About from '@/components/About'
import TechnologyList from '@/components/TechnologyList'
import TimelineList from '@/components/TimelineList'
import ProjectList from '@/components/ProjectList'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Intro,
    About,
    TechnologyList,
    TimelineList,
    ProjectList,
    Footer
  },

  head() {
    return {
      title: 'Numlinet'
    }
  }
}
</script>
