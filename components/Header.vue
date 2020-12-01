<template>
  <div
    class="container flex items-center justify-between px-4 pb-6 mx-auto mt-6 uppercase border-b"
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
    Menu,
  },
}
</script>
