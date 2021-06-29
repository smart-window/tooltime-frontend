<template>
  <div>
    <b-navbar
      class="navbar navbar-expand-lg bg-white fixed-top border-bottom-1 border-primary shadow"
    >
      <b-container>
        <router-link to="/" class="navbar-brand text-primary"> TOOLTIME </router-link>
        <b-navbar-nav class="ml-auto" v-show="this.$store.state.user.authorized === true">
          <router-link to="/products" class="nav-link text-primary">
            <i class="fa fa-home" aria-hidden="true"></i> Products
          </router-link>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <i class="fas fa-map"></i>
              <span> Location </span>
            </template>

            <b-dropdown-item style="width: 500px" v-b-modal.modal-1>
              <label v-if="user.Servicearea">
                {{ user.Servicearea.Location.zip }}, {{ user.Servicearea.Location.city }},
                {{ user.Servicearea.Location.state }}
              </label>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-modal size="lg" id="modal-1" title="Location">
            <GmapMap
              :center="{ lat: 40.7, lng: -74 }"
              :zoom="7"
              map-type-id="terrain"
              style="width: 100%; height: 500px"
            >
            </GmapMap>

            <template #modal-footer="{ hide }">
              <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
                Close
              </b-button>
            </template>
          </b-modal>

          <router-link to="/cart" class="nav-link text-primary">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart ({{ totalCartItems }})
          </router-link>
          <router-link to="/order" class="nav-link text-primary">
            <i class="fas fa-bookmark"> </i>
            Orders({{ orders.length }})
          </router-link>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <i class="fas fa-user-circle"></i>
              <span> {{ user.name }}</span>
            </template>
            <b-dropdown-item v-on:click="handleSignOut">Sign Out</b-dropdown-item>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['user', 'orders']),
    ...mapGetters(['totalCartItems']),
  },
  data() {
    return {
      showMap: false,
    }
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
    handleSignOut() {
      this.$store.dispatch('user/LOGOUT')
    },
  },
}
</script>

<style scoped>
</style>
