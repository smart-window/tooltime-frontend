<template>
  <b-card no-body class="product d-flex flex-column">
    <div class="card__image__wrapper">
      <img :src="currentImage" :alt="product.title" class="product__img" />
    </div>
    <b-card-body class="card-body product__text">
      <p class="product__name">
        {{ product.name }}
      </p>

      <button @click="onViewProductDetail(product.id)" class="btn btn-primary w-full">
        Detail
      </button>
    </b-card-body>
  </b-card>
</template>

<script>
import router from '@/router'
import { sampleImages } from '@/data'
export default {
  name: 'Product',
  props: {
    product: Object,
  },

  data() {
    return {
      currentImageIndex: 0,
      offsetLeft: null,
      offSetTop: null,
      productImageContainerClientWidth: null,
    }
  },

  mounted() {
    console.log('product => ', this.product)
  },

  computed: {
    currentImage() {
      const images = this.product.images.split(',')
      if (images && images.length > 0) return images[0]
      else return sampleImages[0]
    },
  },
  methods: {
    onViewProductDetail(productId) {
      router.push(`/product/${productId}`)
    },
  },
}
</script>

<style scoped lang="scss">
.product {
  padding-bottom: 2rem;
  height: 350px;

  & .card__image__wrapper {
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  &__name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__img {
    width: inherit;
    height: inherit;
    &:focus {
      outline: none;
    }
  }

  &__link {
    flex: 0 0 60%;
    height: 60%;
    padding: 1rem;
    position: relative;
    cursor: pointer;
  }

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
}

@media only screen and (max-width: 768px) {
  .product {
    height: auto !important;
    &__add-to-cart {
      visibility: visible;
      opacity: 1;
    }

    & .owl-dots {
      display: inline-block;
    }
  }
}
</style>
