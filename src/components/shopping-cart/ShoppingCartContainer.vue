<template>
  <b-container>
    <b-card no-body>
      <b-card-header class="text-primary">
        <h3 class="text-primary">
          <i class="fa fa-shopping-cart pr-2" aria-hidden="true"></i> Shopping cart
        </h3>
        <div class="clearfix"></div>
      </b-card-header>
      <b-card-body>
        <ShoppingCartItem
          v-for="(cartItem, index) in cart"
          :product="cartItem"
          :key="index"
        ></ShoppingCartItem>
        <h4 class="text-center" v-if="cart.length === 0">There is no item in cart</h4>
      </b-card-body>
      <b-card-footer>
        <div class="pull-left">
          <button
            class="btn btn-secondary"
            :disabled="totalCartItems === 0"
            @click="handleMakeReservation"
          >
            Make Reservation
          </button>
        </div>
        <div class="pull-right" style="margin: 10px">
          Total Items: <span> {{ totalCartItems }} </span>
        </div>

        <b-card v-show="showReservePanel">
          <b-card-title>
            <h3 class="text-primary">Reservation Details</h3>
          </b-card-title>
          <b-card-body>
            <b-form>
              <b-form-group id="form-group-name" label="Name" label-for="name">
                <b-form-input id="name" type="text" v-model="form.name" required />
              </b-form-group>
              <b-form-group id="form-group-email" label="Email" label-for="email">
                <b-form-input id="email" type="email" v-model="form.email" required />
              </b-form-group>
              <b-form-group id="form-group-phone" label="phone" label-for="phone">
                <b-form-input id="phone" type="text" v-model="form.phone" required />
              </b-form-group>
              <b-form-group id="form-group-address" label="address" label-for="address">
                <b-form-input id="address" type="text" v-model="form.address" required />
              </b-form-group>
              <b-form-group id="form-group-city" label="city" label-for="city">
                <b-form-input id="city" type="text" v-model="form.city" required />
              </b-form-group>
              <b-form-group id="form-group-state" label="state" label-for="state">
                <b-form-input id="state" type="text" v-model="form.state" required />
              </b-form-group>
              <b-form-group id="form-group-zip" label="zip" label-for="zip">
                <b-form-input id="zip" type="text" v-model="form.zip" required />
              </b-form-group>
              <b-form-group id="form-group-location" label="location" label-for="location">
                <b-form-select id="location" v-model="form.location" required>
                  <b-form-select-option
                    value="AAA"
                    v-for="location in locations"
                    v-bind:key="location.id"
                  >
                    {{ location.name }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-form-row class="d-flex justify-content-between">
                <b-button type="submit" class="btn btn-primary"> OK </b-button>
                <b-button class="btn btn-secondary"> Cancel </b-button>
              </b-form-row>
            </b-form>
          </b-card-body>
        </b-card>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ShoppingCartItem from './ShoppingCartItem'
export default {
  name: 'ShoppingCartContainer',
  components: { ShoppingCartItem },

  data() {
    return {
      showReservePanel: false,
      form: {},
    }
  },
  mounted() {
    this.form.name = this.user.name
    this.form.email = this.user.email
    this.form.phone = this.user.phone
    this.form.address = this.user.address
    this.form.city = this.user.city
    this.form.state = this.user.state
    this.form.zip = this.user.zip
  },

  computed: {
    ...mapState(['user', 'cart', 'locations']),
    ...mapGetters(['totalCartItems']),
  },

  methods: {
    handleMakeReservation(e) {
      e.preventDefault()
      this.showReservePanel = true
    },
  },
}
</script>

<style scoped>
</style>
