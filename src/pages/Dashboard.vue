<template>
  <div style="margin-top: -2.5rem">
    <div class="row">
      <div class="col-lg-12">
        <Slider />
        <b-container class="p-5">
          <h2 class="text-primary"><b>Featured Products</b></h2>
          <div class="row">
            <div
              v-for="product in pageProducts"
              :key="product.id"
              class="col-lg-3 col-md-3 col-sm-6 col-xs-12"
            >
              <Product :product="product"></Product>
            </div>
          </div>
          <div class="row">
            <router-link to="/products" class="nav-link"> More Products </router-link>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from '../components/slider/Slider'
import Product from '../components/products/Product'

export default {
  name: 'Home',
  components: {
    Slider,
    Product,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['filterProducts']),
    pageProducts() {
      const tmp = []
      this.filterProducts.map((product, index) => {
        if (index < 4) {
          return tmp.push(product)
        }
      })
      return tmp
    },
  },
  mounted() {
    console.log(this.pageProducts)
  },
}
</script>

<style scoped>
</style>
