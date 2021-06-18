<template>
  <div class="row align-items-center mb-3 cart-row">
    <div class="col-12 col-sm-12 col-md-2 text-center">
      <img
        class="img-responsive"
        alt="prewiew"
        style="height: 60%; width: 60%"
        :src="currentImage"
      />
    </div>
    <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
      <h4 class="product-name">
        <strong>{{ product.name | shortenTitle }}</strong>
      </h4>
      <h4>
        <small class="product-description">{{ product.description }}</small>
      </h4>
    </div>
    <div
      class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-quantity-container align-items-center"
    >
      <div class="col-6 col-sm-6 col-md-6 text-md-right" style="padding-top: 5px">
        <h6>
          <span class="text-muted">x</span>
        </h6>
      </div>
      <div class="col-4 col-sm-4 col-md-4">
        <div class="quantity">
          <input @click="onIncrementCartItem()" type="button" value="+" class="plus" />
          <input
            :value="product.quantity"
            :disabled="true"
            type="number"
            step="1"
            max="10"
            min="1"
            title="Qty"
            class="qty"
            size="4"
          />
          <input @click="onDecrementCartItem()" type="button" value="-" class="minus" />
        </div>
      </div>
      <div class="col-2 col-sm-2 col-md-2 text-right">
        <button @click="onRemoveCartItem()" type="button" class="btn btn-outline-danger btn-xs">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { sampleImages } from '@/data'
import {
  REMOVE_PRODUCT_FROM_CART,
  DECREMENT_CART_ITEM_QUANTITY,
  INCREMENT_CART_ITEM_QUANTITY,
} from '../../store/types'

export default {
  name: 'ShoppingCartItem',
  props: {
    product: Object,
  },
  computed: {
    currentImage() {
      const images = this.product.images.split(',')
      if (images && images.length > 0) return images[0]
      else return sampleImages[0]
    },
  },
  methods: {
    onIncrementCartItem() {
      this.$store.commit(INCREMENT_CART_ITEM_QUANTITY, this.product.id)
    },
    onDecrementCartItem() {
      this.$store.commit(DECREMENT_CART_ITEM_QUANTITY, this.product.id)
    },
    onRemoveCartItem() {
      this.$store.commit(REMOVE_PRODUCT_FROM_CART, this.product.id)
    },
  },
}
</script>

<style scoped lang="scss">
.cart-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.quantity {
  float: left;
  margin-right: 15px;
  background-color: #eee;
  position: relative;
  width: 80px;
  overflow: hidden;

  & input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #f6f6f6;

    &.qty {
      position: relative;
      border: 0;
      width: 100%;
      height: 40px;
      padding: 10px 25px 10px 10px;
      text-align: center;
      font-weight: 400;
      font-size: 15px;
      border-radius: 0;
      background-clip: padding-box;
    }
  }

  & .minus,
  & .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-background-size: 6px 30px;
    -moz-background-size: 6px 30px;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3;
    &:hover {
      background-color: #dad8da;
    }
  }

  & .minus {
    bottom: 0;
  }
}

@media only screen and (max-width: 768px) {
  .product-name {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .product-description {
    font-size: 1rem;
  }

  .product-quantity-container {
    margin-top: 0.5rem;
  }
}
</style>
