<template>
  <b-card no-body>
    <b-card-header>
      <h3 class="text-primary">Order List</h3>
    </b-card-header>
    <b-card-body class="order-list-wrapper">
      <ul class="order-list">
        <li
          v-for="order in orders"
          v-bind:key="order.id"
          :class="orderItemClass(order)"
          @click="handleSelectOrder(order, $event)"
        >
          <a href="#"> {{ order.name }} </a>
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
import route from '@/router'
export default {
  name: 'OrderList',
  props: ['selectedOrder'],
  computed: {
    ...mapState(['orders']),
  },

  methods: {
    getOrderItemsCount(order) {
      return order.OrderItems.reduce(
        (totalItems, orderItem) => totalItems + orderItem.orderCount,
        0,
      )
    },

    pickDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    handleSelectOrder(order, e) {
      e.preventDefault()
      //this.$emit('onSelect', order)
      // this.$store.commit('SET_SELECTED_ORDER', order)
      if (order.id !== this.selectedOrder.id) route.push(`/order/${order.id}`)
    },

    orderItemClass(order) {
      if (order.id === this.selectedOrder.id) {
        return 'selected'
      } else return ''
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/styles/mixins.scss';
.order-list-wrapper {
  padding: 0px;
}

ul.order-list {
  padding: 0px;
  & li {
    list-style: none;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &.selected {
      background-color: $gray-1;
    }
  }
}
</style>
