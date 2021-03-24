<template>
  <b-card no-body class="product d-flex flex-column">
    <div class="card__image">
      <img :src="currentImage" :alt="product.title" class="card-img-top product__img" />
    </div>
    <b-card-body class="card-body product__text">
      <p>
        {{ product.name }}
      </p>
      <button @click="onAddProductToCart()" class="btn btn-info">Add to cart</button>
    </b-card-body>
  </b-card>
</template>

<script>
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
      return this.product.images
    },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.product {
  padding-bottom: 2rem;
  height: 350px;

  & .card__image {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__img {
    &:focus {
      outline: none;
    }
  }

  &__text {
    flex: 0 0 40%;
  }

  &__link {
    flex: 0 0 60%;
    height: 60%;
    padding: 1rem;
    position: relative;
    cursor: pointer;
  }

  &__description {
    font-size: 0.7rem;
  }

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }

  &__add-to-cart {
    position: absolute;
    bottom: 0.8rem;
    width: 60%;
    left: 50%;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%);
    transition: all 0.2s;
    padding: 3px 12px;
  }

  &:hover &__add-to-cart {
    visibility: visible;
    opacity: 1;
  }

  &:hover .owl-dots {
    display: inline-block;
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
