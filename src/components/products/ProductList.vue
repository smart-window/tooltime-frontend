<template>
  <div>
    <b-row class="mb-3">
      <div class="col-12 d-none d-lg-block d-xl-block">
        <b-card no-body>
          <b-card-header class="d-flex justify-content-end">
            <label style="float: left">Featured Products</label>
            <b-input placeholder="Search" style="width: 200px" @keyup="onSearch" />
            <div class="col-4">
              <b-form-select v-model="sortType">
                <b-form-select-option value="newest"> Newest </b-form-select-option>
                <!-- <b-form-select-option value="price"> Price </b-form-select-option> -->
              </b-form-select>
            </div>
          </b-card-header>
        </b-card>
      </div>
    </b-row>
    <div class="row">
      <div v-for="(product, index) in pageProducts" :key="product.id" class="col-md-6 col-lg-4 mb-4">
        <Product :product="product" :index="index"></Product>
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
      sortType: 'newest',
      searchProducts: [],
    }
  },

  mounted() {
    this.searchProducts = this.filterProducts
  },

  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['filterProducts']),
    pageProducts() {
      return this.searchProducts.slice(
        (this.currentPage - 1) * this.perPage,
        Math.min(this.currentPage * this.perPage, this.searchProducts.length),
      )
    },
  },

  methods: {
    onSearch(e) {
      this.searchProducts = this.filterProducts.filter((product) => {
        return product.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
    },
  },

  watch: {
    filterProducts(filterProducts) {
      this.searchProducts = filterProducts
    },
  },
}
</script>

<style scoped>
</style>
