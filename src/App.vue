<template>
  <router-view> </router-view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState('user', ['authorized']),
    nextRoute() {
      return this.$route.query.redirect || '/'
    },
    currentRoute() {
      return this.$route.path
    },
  },

  mounted() {
    this.$store.dispatch('user/LOAD_CURRENT_ACCOUNT')
  },

  watch: {
    authorized(authorized) {
      if (authorized && this.currentRoute === '/auth/login') {
        this.$router.replace(this.nextRoute)
      }
    },
  },
}
</script>

<style>
</style>
