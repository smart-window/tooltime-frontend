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
        <div class="pull-right" style="margin: 10px">Total Items:</div>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ShoppingCartItem from './ShoppingCartItem'
export default {
  name: 'ShoppingCartContainer',
  components: { ShoppingCartItem },

  computed: {
    ...mapState(['cart']),
  },
}
</script>

<style scoped>
</style>
