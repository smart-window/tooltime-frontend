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

  async mounted() {
    this.product = await api.getProduct(this.productId)
    console.log('product => ', this.product)
  },

  computed: {
    productImages() {
      return this.product === undefined ? this.product.images.split(',') : sampleImages
    },

    productId() {
      return this.$route.params.id
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
