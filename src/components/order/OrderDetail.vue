<template>
  <b-card no-body class="order-detail">
    <b-card-title>
      <h5 class="text-primary">{{ orderTitle }}</h5>
    </b-card-title>
    <b-card-body class="order-list-wrapper">
      <p>Location: {{ order.location }}</p>
      <p>Email: {{ order.email }}</p>
      <p>Phone: {{ order.phone }}</p>
      <p>Address: {{ order.address }},{{ order.city }}, {{ order.state }}</p>
      <p>Pickup Date: {{ pickDate(order.pickupDate) }}</p>
      <b-table striped hover :items="orderItems" :fields="orderFields"> </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'OrderDetail',
  props: ['order'],

  computed: {
    ...mapState(['products']),
    orderTitle() {
      return !this.order.name || this.order.name === undefined ? 'Select Order' : this.order.name
    },

    orderItems() {
      return (this.order.orderItems || []).map((order) => {
        const product = this.products.find((product) => product.id === order.productId)
        return {
          productName: product.name,
          images: product.images.split(','),
          orderCount: order.orderCount,
        }
      })
    },

    orderFields() {
      return ['productName', 'orderCount']
    },
  },

  methods: {
    pickDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding: 10px 10px;
}
</style>