<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 d-none d-lg-block d-xl-block">
        <div class="card">
          <div class="card-header d-flex justify-content-end">
            <span class="mr-3">Change Layout: </span>
            <LayoutMode
              :isActive="gridValue === 3"
              :len="3"
              @changeLayout="onChangeLayout($event)"
              style="margin-right: 0.8rem"
            ></LayoutMode>
            <LayoutMode
              :isActive="gridValue === 4"
              :len="4"
              @changeLayout="onChangeLayout($event)"
            ></LayoutMode>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="product in $store.getters.paginate"
        :key="product.id"
        :class="['col-md-6 mb-4', colValue]"
      >
        <Product :product="product"></Product>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutMode from '../core/LayoutMode'
import Product from './Product'
export default {
  name: 'ProductList',
  components: { Product, LayoutMode },
  data() {
    return {
      colValue: 'col-lg-4',
      gridValue: 3,
      currentPage: this.$store.state.currentPage,
      perPage: this.$store.state.perPage,
      products: this.$store.getters.paginate,
    }
  },
  methods: {
    onChangeLayout(n) {
      this.gridValue = n
      if (n === 4) {
        this.colValue = `col-lg-${3}`
      } else {
        this.colValue = `col-lg-${4}`
      }
    },
  },
}
</script>

<style scoped>
</style>
