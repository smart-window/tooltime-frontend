<template>
  <div>
    <b-navbar
      class="navbar navbar-expand-lg bg-white fixed-top border-bottom-1 border-primary shadow"
    >
      <b-container>
        <router-link to="/products" class="navbar-brand text-primary"> TOOLTIME </router-link>
        <b-navbar-nav class="ml-auto">
          <router-link to="/cart" class="nav-link text-primary">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Cart ({{
              $store.getters.cartLength
            }})
          </router-link>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item v-on:click="handleSignOut">Sign Out</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',

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
