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
        <dt>Brand</dt>
        <dd class="text-capitalize">{{ product.brand }}</dd>
      </dl>
      <dl class="param param-feature">
        <dt>Size</dt>
        <dd>{{ product.size }}</dd>
      </dl>
      <hr />
      <b-row>
        <div class="col-12 col-md-4"><b-spinbutton min="1" v-model="quantity"> </b-spinbutton></div>
        <div class="col-12 col-md-8">
          <button @click="onAddProductToCart()" class="btn btn-lg btn-secondary text-uppercase">
            <i class="fa fa-shopping-cart"></i> Add to cart
          </button>
        </div>
      </b-row>
    </article>
  </aside>
</template>

<script>
import { ADD_PRODUCT_TO_CART } from '../../store/types'
export default {
  name: 'ProductDetail',
  props: {
    product: Object,
  },
  data() {
    return {
      quantity: 1,
    }
  },
  mounted() {},
  methods: {
    onAddProductToCart() {
      console.log('quantity =>', this.quantity)
      this.$store.commit(ADD_PRODUCT_TO_CART, { product: this.product, quantity: this.quantity })
      this.$swal(`${this.product.name} was successfully added to cart!`)
      this.quantity = 1
    },
  },
}
</script>

<style scoped>
</style>
