<template>
  <div
    class="container mx-auto px-4 flex justify-between items-end mt-6 mx-8 pb-6 border-b uppercase"
  >
    <!-- Logo -->
    <Logo></Logo>

    <!-- Menu -->
    <Menu></Menu>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import Menu from '@/components/Menu'

export default {
  components: {
    Logo,
    Menu
  }
}
</script>
