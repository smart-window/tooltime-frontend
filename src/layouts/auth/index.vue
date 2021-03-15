<template>
  <Fragment>
    <Header></Header>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </Fragment>
</template>

<script>
import Header from '@/components/core/Header'
import Footer from '@/components/core/Footer'
import { Fragment } from 'vue-fragment'
export default {
  name: 'AuthLayout',
  components: { Header, Fragment, Footer },
}
</script>