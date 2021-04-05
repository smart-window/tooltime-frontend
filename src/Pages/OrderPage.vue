<template>
  <b-container>
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <OrderList @onSelect="handleSelectOrder" :selectedOrder="selectedOrder" />
      </div>
      <div class="col-sm-12 col-md-8">
        <OrderDetail :order="selectedOrder" />
      </div>
    </div>
  </b-container>
</template>

<script>
import OrderList from '@/components/order/OrderList'
import OrderDetail from '@/components/order/OrderDetail'
export default {
  name: 'OrderPage',
  components: {
    OrderList,
    OrderDetail,
  },

  data() {
    return {
      selectedOrder: {},
    }
  },

  methods: {
    handleSelectOrder(order) {
      this.selectedOrder = order
    },
  },
}
</script>