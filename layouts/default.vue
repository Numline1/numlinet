<template>
  <div class="flex flex-col min-h-screen font-sans antialiased">
    <Header></Header>
    <nuxt class="flex-grow mt-8" />
    <Footer></Footer>
    <script
      async
      src="https://ackee.zeus.numli.net/tracker.js"
      data-ackee-server="https://ackee.zeus.numli.net"
      data-ackee-domain-id="52aada0a-db2d-439d-aea2-c7434e32b21c"
    ></script>
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
