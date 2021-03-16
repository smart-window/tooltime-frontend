<template>
  <div>
    <Header></Header>
    <div class="body">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/core/Header'
import Footer from '@/components/core/Footer'
export default {
  name: 'AuthLayout',
  components: { Header, Footer },
}
</script>

<style scoped>
.body {
  padding-top: 6rem;
}
</style>