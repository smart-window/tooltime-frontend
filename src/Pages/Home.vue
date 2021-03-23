<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <CategoryFilter></CategoryFilter>
          <PriceFilter></PriceFilter>
        </div>
        <div class="col-lg-9">
          <ProductList></ProductList>
          <div class="d-flex justify-content-end">
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryFilter from '../components/filters/CategoryFilter'
import PriceFilter from '../components/filters/PriceFilter'
import ProductList from '../components/products/ProductList'
import Pagination from '../components/pagination/Pagination'
export default {
  name: 'Home',
  components: { Pagination, ProductList, PriceFilter, CategoryFilter },
  data() {
    return {}
  },
}
</script>

<style scoped>
</style>
