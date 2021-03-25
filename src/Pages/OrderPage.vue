<template>
  <b-container>
    <div class="col-sm-12 col-md-4">
      <OrderList />
    </div>
  </b-container>
</template>

<script>
import OrderList from '@/components/order/OrderList'
export default {
  name: 'OrderPage',

  components: {
    OrderList,
  },
}
</script>