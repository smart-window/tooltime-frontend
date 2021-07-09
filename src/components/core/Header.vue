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

            <b-dropdown-item v-b-modal.modal-1>
              <label v-if="user.Servicearea">
                {{ user.Servicearea.Location.zip }}, {{ user.Servicearea.Location.city }},
                {{ user.Servicearea.Location.state }}, {{ user.Servicearea.Location.hours }},
                {{ user.Servicearea.Location.phone }}
              </label>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-modal size="xl" id="modal-1" title="Location">
            <div class="row">
              <div class="col-6">
                <b-card no-body>
                  <b-card-body class="order-list-wrapper">
                    <h2 class="text-primary mt-4 mb-3">Location Details</h2>
                    <p>
                      <span><i class="fas fa-bookmark"></i> </span>&nbsp;&nbsp;
                      {{ user.Servicearea.Location.name }}
                    </p>
                    <p>
                      <span><i class="fas fa-book"></i> </span>&nbsp;&nbsp;
                      {{ user.Servicearea.Location.description }}
                    </p>
                    <p>
                      <span> <i class="fas fa-map-marker-alt"></i> </span>&nbsp;&nbsp;
                      {{ user.Servicearea.Location.zip }}, {{ user.Servicearea.Location.city }},
                      {{ user.Servicearea.Location.state }}
                    </p>
                    <p>
                      <span><i class="fas fa-phone-alt"></i> </span>&nbsp;&nbsp;
                      {{ user.Servicearea.Location.phone }}
                    </p>
                    <p>
                      <span> <i class="fas fa-calendar-alt"></i> </span>&nbsp;&nbsp;
                      {{ user.Servicearea.Location.hours }}
                    </p>
                  </b-card-body>
                </b-card>
              </div>

              <div class="col-6">
                <GmapMap
                  style="width: 100%; height: 500px"
                  map-type-id="terrain"
                  :center="{ lat: user.Servicearea.latitude, lng: user.Servicearea.longitude }"
                  :zoom="10"
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in [
                      {
                        lat: user.Servicearea.latitude,
                        lng: user.Servicearea.longitude,
                        label: 'Location',
                      },
                    ]"
                    :position="m"
                    @click="center = m"
                  />
                </GmapMap>
              </div>
            </div>

            <template #modal-footer="{ hide }">
              <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
                Close
              </b-button>
            </template>
          </b-modal>

          <router-link to="/billing-plan" class="nav-link text-primary">
            <i class="fa fa-credit-card" aria-hidden="true"></i> Billing Plan
          </router-link>
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
