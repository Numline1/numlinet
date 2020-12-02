<template>
  <div class="flex flex-col min-h-screen font-sans antialiased">
    <Header></Header>
    <nuxt class="flex-grow mt-8" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer,
  },

  head() {
    return {
      title: 'Numlinet',
    }
  },
}
</script>
