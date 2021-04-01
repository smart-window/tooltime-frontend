<template>
  <b-card no-body>
    <b-card-header>
      <h3 class="text-primary">Order List</h3>
    </b-card-header>
    <b-card-body class="order-list-wrapper">
      <ul class="order-list">
        <li v-for="order in orders" v-bind:key="order.id">
          <a href="#" @click="handleSelectOrder(order, $event)"> {{ order.name }} </a>
          <b-badge pill variant="success">
            {{ getOrderItemsCount(order) }}
          </b-badge>
          <p>{{ pickDate(order.pickupDate) }}</p>
          <b-badge> {{ order.status }} </b-badge>
        </li>
      </ul>
    </b-card-body>
    <b-card-body> </b-card-body>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'OrderList',

  computed: {
    ...mapState(['orders']),
  },

  methods: {
    getOrderItemsCount(order) {
      console.log('getOrderItemsCount.order => ', order)
      return order.orderItems.reduce(
        (totalItems, orderItem) => totalItems + orderItem.orderCount,
        0,
      )
    },

    pickDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    handleSelectOrder(order, e) {
      e.preventDefault()
      this.$emit('onSelect', order)
    },
  },
}
</script>
<style scoped lang="scss">
.order-list-wrapper {
  padding: 0px;
}

ul.order-list {
  padding: 0px;
  & li {
    list-style: none;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
