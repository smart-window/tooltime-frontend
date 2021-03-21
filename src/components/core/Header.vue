<template>
  <div>
    <b-navbar
      class="navbar navbar-expand-lg bg-white fixed-top border-bottom-1 border-primary shadow"
    >
      <b-container>
        <router-link to="/products" class="navbar-brand text-primary"> TOOLTIME </router-link>
        <b-navbar-nav class="ml-auto" v-show="this.$store.state.user.authorized === true">
          <router-link to="/cart" class="nav-link text-primary">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i> Cart ({{
              $store.getters.cartLength
            }})
          </router-link>

          <b-nav-item-dropdown :text="user.name" right>
            <b-dropdown-item v-on:click="handleSignOut">Sign Out</b-dropdown-item>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    handleSignOut() {
      console.log('handleSignOut called!')
      this.$store.dispatch('user/LOGOUT')
    },
  },
}
</script>

<style scoped>
</style>
