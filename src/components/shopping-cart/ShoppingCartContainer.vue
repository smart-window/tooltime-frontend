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
            <b-form @submit="handleSumbitOrder">
              <b-form-group id="form-group-name" label="Name" label-for="name">
                <b-form-input id="name" type="text" v-model="form.name" required />
              </b-form-group>
              <b-form-group id="form-group-email" label="Email" label-for="email">
                <b-form-input id="email" type="email" v-model="form.email" required />
              </b-form-group>
              <b-form-group id="form-group-phone" label="Phone" label-for="phone">
                <b-form-input id="phone" type="text" v-model="form.phone" required />
              </b-form-group>
              <b-form-group id="form-group-address" label="Address" label-for="address">
                <b-form-input id="address" type="text" v-model="form.address" readonly />
              </b-form-group>
              <b-form-group id="form-group-city" label="City" label-for="city">
                <b-form-input id="city" type="text" v-model="form.city" readonly />
              </b-form-group>
              <b-form-group id="form-group-state" label="State" label-for="state">
                <b-form-input id="state" type="text" v-model="form.state" readonly />
              </b-form-group>
              <b-form-group id="form-group-zip" label="Zip" label-for="zip">
                <b-form-input id="zip" type="text" v-model="form.zip" readonly />
              </b-form-group>
              <b-form-group id="form-group-location" label="Location" label-for="location">
                <b-form-select id="location" v-model="form.locationId" disabled>
                  <b-form-select-option :value="user.Servicearea.Location.id">
                    {{ user.Servicearea.Location.name }}, {{ user.Servicearea.Location.zip }},
                    {{ user.Servicearea.Location.city }}, {{ user.Servicearea.Location.state }},
                    {{ user.Servicearea.Location.phone }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-form-group
                id="form-group-start-date"
                label="Reservation Start Date"
                label-for="start-date"
              >
                <b-form-datepicker
                  id="start-date"
                  v-model="form.startDate"
                  required
                  aria-required="true"
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group
                id="form-group-end-date"
                label="Reservation End Date"
                label-for="end-date"
              >
                <b-form-datepicker
                  id="end-date"
                  v-model="form.endDate"
                  required
                  aria-required="true"
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group id="form-group-notes" label="Notes" label-for="notes">
                <b-form-textarea id="notes" v-model="form.notes" debounce="500"> </b-form-textarea>
              </b-form-group>
              <b-form-row class="d-flex justify-content-between">
                <b-button type="submit" class="btn btn-primary"> OK </b-button>
                <b-button @click="handleCancelReservation" class="btn btn-secondary">
                  Cancel
                </b-button>
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
import router from '@/router'
import moment from 'moment'

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
    this.form.customerId = this.user.id
    this.form.name = this.user.name
    this.form.email = this.user.email
    this.form.phone = this.user.phone
    this.form.address = this.user.address
    this.form.city = this.user.city
    this.form.state = this.user.state
    this.form.zip = this.user.zip
    this.form.locationId = this.user.Servicearea.Location.id
    this.form.startDate = new Date()
    this.form.endDate = new Date(moment().add(7, 'days'))
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

    handleCancelReservation(e) {
      e.preventDefault()
      this.showReservePanel = false
    },

    async handleSumbitOrder(e) {
      e.preventDefault()
      this.form.orderItems = this.cart.map((product) => {
        return {
          productId: product.id,
          orderCount: product.quantity,
          startDate: product.startDate,
          endDate: product.endDate,
        }
      })

      this.form.customerId = this.user.id
      this.form.startDate = moment(this.form.startDate).format('YYYY-MM-DD')
      this.form.endDate = moment(this.form.endDate).format('YYYY-MM-DD')
      this.form.pickupDate = moment(this.form.startDate).format('YYYY-MM-DD')

      this.$store
        .dispatch('CREATE_ORDER', this.form)
        .then((res) => {
          if (res.invalidName) {
            this.$swal(res.invalidName + ' is not available!')
          } else {
            this.$swal('New order has been created!')
          }
          router.push('/order')
        })
        .catch((e) => {
          this.$swal(e.message)
        })
    },
  },
}
</script>

<style scoped>
</style>
