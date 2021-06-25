<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
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
import ProductList from '../components/products/ProductList'
import Pagination from '../components/pagination/Pagination'

export default {
  name: 'Home',
  components: {
    Pagination,
    ProductList,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
</style>
