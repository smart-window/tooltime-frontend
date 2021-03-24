<template>
  <div>
    <b-row class="mb-3">
      <div class="col-12 d-none d-lg-block d-xl-block">
        <b-card no-body>
          <b-card-header class="d-flex justify-content-end">
            <div class="col-4">
              <b-form-select v-model="sortType">
                <b-form-select-option value="newest"> Newest </b-form-select-option>
                <b-form-select-option value="price"> Price </b-form-select-option>
              </b-form-select>
            </div>
          </b-card-header>
        </b-card>
      </div>
    </b-row>
    <div class="row">
      <div v-for="product in filterProducts" :key="product.id" class="col-md-6 col-lg-4 mb-4">
        <Product :product="product"></Product>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Product from './Product'
export default {
  name: 'ProductList',
  components: { Product },
  data() {
    return {
      gridValue: 3,
    }
  },

  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['filterProducts']),
  },
  methods: {},
}
</script>

<style scoped>
</style>
