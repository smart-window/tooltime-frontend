<template>
  <div class="container">
    <div class="card">
      <div class="row">
        <ProductSlider :images="productImages" class="col-sm-5 border-right"></ProductSlider>
        <ProductDetail :product="product" class="col-sm-7"></ProductDetail>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetail from '../components/products/ProductDetail'
import ProductSlider from '../components/products/ProductSlider'
import * as api from '@/services/api'
import { sampleImages } from '@/data'
export default {
  name: 'ProductDetailPage',
  components: { ProductSlider, ProductDetail },
  props: ['productId'],

  async mounted() {
    console.log(this.productId)
    this.product = await api.getProduct(this.productId)
  },

  computed: {
    productImages() {
      return this.product.images !== undefined ? this.product.images.split(',') : sampleImages
    },
  },

  data() {
    return {
      product: {},
    }
  },
}
</script>

<style scoped>
</style>
