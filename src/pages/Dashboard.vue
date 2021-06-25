<template>
  <div style="margin-top: -2.5rem">
    <div class="row">
      <div class="col-lg-12">
        <Slider />
        <b-card style="padding: 20px 20%">
          <b-card-header>
            <h2 class="text-primary"><b>Featured Products</b></h2>
          </b-card-header>
          <b-card-body>
            <div class="row">
              <div
                v-for="product in pageProducts"
                :key="product.id"
                class="col-md-3 col-lg-3 col-xs-6"
              >
                <Product :product="product"></Product>
              </div>
            </div>
            <div class="row">
              <router-link to="/products" class="nav-link">
                <h4 class="text-primary">More Products >></h4>
              </router-link>
            </div>
          </b-card-body>
          <b-card-footer> </b-card-footer>
        </b-card>
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
      return this.filterProducts.map((product, index) => {
        return index < 4 ? product : ''
      })
    },
  },
}
</script>

<style scoped>
</style>
