<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 class="text-center" style="margin-top: 200px">Account Confirmed!</h2>
          <router-link to="/auth/login" class="nav-link text-primary text-center">
            <b-button variant="outline-primary" style="margin: 0 auto">Please Login</b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api'

export default {
  name: 'ConfirmPage',
  async mounted() {
    await api.verifyUser(this.$route.param.confirmationCode)
  },
}
</script>

<style scoped>
</style>
