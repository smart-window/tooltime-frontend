<template>
  <div>
    <b-card v-if="order.id === undefined">
      <b-card-body> <h3 class="text-primary">Select Order to see the details</h3> </b-card-body>
    </b-card>
    <b-card no-body class="order-detail" v-if="order.id !== undefined">
      <b-card-title>
        <h5 class="text-primary">{{ orderTitle }}</h5>
      </b-card-title>
      <b-card-body class="order-list-wrapper">
        <p>Location: {{ order.location }}</p>
        <p>Email: {{ order.email }}</p>
        <p>Phone: {{ order.phone }}</p>
        <p>Address: {{ order.address }},{{ order.city }}, {{ order.state }}</p>
        <p>Pickup Date: {{ pickDate(order.pickupDate) }}</p>
        <p>Notes</p>
        <p>{{ order.notes }}</p>
        <b-table striped hover :items="orderItems" :fields="orderFields">
          <template #cell(productName)="row">
            <router-link :to="`/product/${row.item.productId}`"> {{ row.value }} </router-link>
          </template>
          <template #cell(actions)="row">
            <b-button class="btn btn-danger">
              <span> <i class="fas fa-trash-alt"></i> </span>
            </b-button>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
    <b-row v-if="order.id !== undefined">
      <b-container class="d-flex flex-row justify-content-between pt-2">
        <b-button> <i class="fas fa-edit"> </i> Edit </b-button>
        <b-button> <i class="fas fa-trash-alt"> </i> Remove </b-button>
      </b-container>
    </b-row>
  </div>
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
          id: order.id,
          productId: product.id,
          productName: product.name,
          images: product.images.split(','),
          orderCount: order.orderCount,
        }
      })
    },

    orderFields() {
      return [
        {
          key: 'productName',
          label: 'Product Name',
        },
        {
          key: 'orderCount',
          label: 'Count',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ]
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