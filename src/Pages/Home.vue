<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <Slider></Slider>
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
import Slider from '../components/slider/Slider'

export default {
  name: 'Home',
  components: {
    Pagination,
    ProductList,
    Slider,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
</style>
