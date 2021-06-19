<template>
  <aside>
    <article class="card-body p-5">
      <h3 class="text-primary mb-3">{{ product.name }}</h3>
      <dl class="item-property">
        <dt>Description</dt>
        <dd>
          <p class="text-capitalize">{{ product.description }}</p>
        </dd>
      </dl>
      <dl class="param param-feature">
        <dt>Reservation Date</dt>
        <b-row>
          <div class="col-12 col-md-4 text-center" style="padding-top: 5px">Start Date</div>
          <div class="col-12 col-md-8">
            <b-form-group id="form-group-pick-date">
              <b-form-datepicker
                v-model="startDate"
                required
                aria-required="true"
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </b-row>
        <b-row>
          <div class="col-12 col-md-4 text-center" style="padding-top: 5px">End Date</div>
          <div class="col-12 col-md-8">
            <b-form-group id="form-group-pick-date">
              <b-form-datepicker
                v-model="endDate"
                required
                aria-required="true"
              ></b-form-datepicker>
            </b-form-group>
          </div>
        </b-row>
      </dl>
      <hr />
      <b-row>
        <div class="col-12 col-md-6"><b-spinbutton min="1" v-model="quantity"> </b-spinbutton></div>
        <div class="col-12 col-md-6">
          <button @click="onAddProductToCart()" class="btn btn-secondary text-uppercase">
            <i class="fa fa-shopping-cart"></i> Add to cart
          </button>
        </div>
      </b-row>
      <hr />
      <b-row v-if="getCartItem != undefined">
        <div class="col-12 col-md-6">
          <b-alert show variant="info">
            <router-link to="/cart"> {{ getCartItem.quantity }} items are in the cart </router-link>
          </b-alert>
        </div>
        <div class="col-12 col-md-6">
          <b-button variant="danger" @click="handleRemoveFromCart">
            <i class="fas fa-trash-alt"> </i> Remove
          </b-button>
        </div>
      </b-row>
    </article>
  </aside>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../../store/types'
import moment from 'moment'
export default {
  name: 'ProductDetail',
  props: {
    product: Object,
  },
  data() {
    return {
      quantity: 1,
      startDate: new Date(),
      endDate: new Date(),
    }
  },
  computed: {
    ...mapState(['cart']),

    getCartItem() {
      const found = this.cart.find((item) => item.id === this.product.id)
      return found
    },
  },
  methods: {
    ...mapMutations({
      addProductToCart: ADD_PRODUCT_TO_CART,
      removeProductFromCart: REMOVE_PRODUCT_FROM_CART,
    }),
    onAddProductToCart() {
      this.addProductToCart({
        product: this.product,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        quantity: this.quantity,
      })
      this.$swal(`${this.product.name} was successfully added to cart!`)
      this.quantity = 1
    },

    handleRemoveFromCart() {
      this.removeProductFromCart(this.product.id)
      this.$swal(`${this.product.name} has been removed  from cart!`)
    },
  },
}
</script>

<style scoped>
</style>
