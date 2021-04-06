<template>
  <b-container>
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <OrderList :selectedOrder="selectedOrder" />
      </div>
      <div class="col-sm-12 col-md-8">
        <OrderDetail />
      </div>
    </div>
  </b-container>
</template>

<script>
import OrderList from '@/components/order/OrderList'
import OrderDetail from '@/components/order/OrderDetail'
import { mapState } from 'vuex'
import router from '@/router'
export default {
  name: 'OrderPage',
  components: {
    OrderList,
    OrderDetail,
  },

  computed: {
    ...mapState(['selectedOrder', 'orders']),

    orderId() {
      return this.$route.params.id
    },
  },

  methods: {},

  mounted() {
    if (this.orderId === undefined) {
      if (
        this.selectedOrder.id !== undefined &&
        this.orders.findIndex((order) => order.id === this.selectedOrder.id) > -1
      )
        router.push(`/order/${this.selectedOrder.id}`)
      else this.$store.commit('SET_SELECTED_ORDER', {})
    } else this.$store.dispatch('LOAD_SELECTED_ORDER', this.orderId)
  },

  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      this.$store.dispatch('LOAD_SELECTED_ORDER', this.orderId)
    },

    orderId(nextOrderId) {
      if (nextOrderId === undefined) {
        if (
          this.selectedOrder.id !== undefined &&
          this.orders.findIndex((order) => order.id === this.selectedOrder.id) > -1
        )
          router.push(`/order/${this.selectedOrder.id}`)
        else this.$store.commit('SET_SELECTED_ORDER', {})
      }
    },
  },
}
</script>