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
      <button @click="onAddProductToCart()" class="btn btn-lg btn-outline-primary text-uppercase">
        <i class="fa fa-shopping-cart"></i> Add to cart
      </button>
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
  mounted() {},
  methods: {
    onAddProductToCart() {
      this.$store.commit(ADD_PRODUCT_TO_CART, this.product)
    },
  },
}
</script>

<style scoped>
</style>
