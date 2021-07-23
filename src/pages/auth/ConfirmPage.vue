<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="text-center" style="margin-top: 200px">Account Confirmed!</h2>
          <router-link to="/" class="nav-link text-primary text-center">
            <b-button variant="primary" style="margin: 0 auto">Please Login</b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as auth from '@/services/auth'

export default {
  name: 'ConfirmPage',
  async mounted() {
    await auth.verifyUser(this.$route.params.confirmationCode)
    this.$store.dispatch('user/LOAD_CURRENT_ACCOUNT')
  },
}
</script>

<style scoped>
</style>
