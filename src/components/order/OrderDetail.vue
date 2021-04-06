<template>
  <div>
    <b-card v-if="order.id === undefined">
      <b-card-body> <h3 class="text-primary">Select Order to see the details</h3> </b-card-body>
    </b-card>
    <b-card no-body class="order-detail" v-if="order.id !== undefined">
      <b-card-title>
        <h5 class="text-primary">{{ orderTitle }}</h5>
      </b-card-title>
      <b-card-body class="order-list-wrapper" v-if="!editing">
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
        </b-table>
      </b-card-body>
      <b-card-body class="order-list-wrapper" v-if="editing">
        <b-form>
          <b-form-group id="form-group-name" label="Name" label-for="name">
            <b-form-input id="name" type="text" v-model="order.name" required />
          </b-form-group>
          <b-form-group id="form-group-email" label="Email" label-for="email">
            <b-form-input id="email" type="email" v-model="order.email" required />
          </b-form-group>
          <b-form-group id="form-group-phone" label="phone" label-for="phone">
            <b-form-input id="phone" type="text" v-model="order.phone" required />
          </b-form-group>
          <b-form-group id="form-group-address" label="address" label-for="address">
            <b-form-input id="address" type="text" v-model="order.address" required />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input id="city" type="text" v-model="order.city" required />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input id="state" type="text" v-model="order.state" required />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input id="zip" type="text" v-model="order.zip" required />
          </b-form-group>
          <b-form-group id="form-group-location" label="location" label-for="location">
            <b-form-select id="location" v-model="order.locationId" required>
              <b-form-select-option
                :value="location.id"
                v-for="location in locations"
                v-bind:key="location.id"
              >
                {{ location.name }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group id="form-group-pick-date" label="Pick date" label-for="pick-date">
            <b-form-datepicker
              id="pick-date"
              v-model="order.pickupDate"
              required
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group id="form-group-notes" label="Notes" label-for="notes">
            <b-form-textarea id="notes" v-model="order.notes" debounce="500"> </b-form-textarea>
          </b-form-group>
        </b-form>
        <b-table striped hover :items="orderItems" :fields="orderFields">
          <template #cell(productName)="row">
            <router-link :to="`/product/${row.item.productId}`"> {{ row.value }} </router-link>
          </template>
          <template #cell(orderCount)="row">
            <b-form-spinbutton v-model="row.item.orderCount"> </b-form-spinbutton>
          </template>
          <template #cell(actions)>
            <b-button class="btn btn-danger">
              <span> <i class="fas fa-trash-alt"></i> </span>
            </b-button>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
    <b-row v-if="order.id !== undefined">
      <b-container class="d-flex flex-row justify-content-between pt-2" v-if="!editing">
        <b-button variant="primary" @click="handleEditOrder">
          <i class="fas fa-edit"> </i> Edit
        </b-button>
        <b-button @click="handleRemoveOrder"> <i class="fas fa-trash-alt"> </i> Remove </b-button>
      </b-container>
      <b-container class="d-flex flex-row justify-content-between pt-2" v-if="editing">
        <b-button @click="handleSaveUpdates" variant="primary">
          <i class="fas fa-save"> </i> Save
        </b-button>
        <b-button @click="handleSetDefault" variant="primary">
          <i class="fas fa-default"> </i> Default
        </b-button>
        <b-button @click="handleCloseEditing"><i class="fas fa-times"></i> Cancel </b-button>
      </b-container>
      <b-modal content-class="modal-confirm" v-model="showRemoveConfirmModal">
        <template #modal-title>
          <h5 class="text-primary">
            <i class="fas fa-exclamation-triangle"></i> Are you sure to remove?
          </h5>
        </template>
        <p class="text-secondary">
          Once you remove the order, it will be removed forever you can not recover it again.!
        </p>
        <template #modal-footer>
          <b-button @click="handleConfirmRemove" variant="primary" class="btn btn-primary">
            Yes
          </b-button>
          <b-button @click="handleCancelRemove" class="btn btn-secondary"> No </b-button>
        </template>
      </b-modal>
    </b-row>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import * as _ from 'lodash'
export default {
  name: 'OrderDetail',

  data() {
    return {
      editing: false,
      order: {},
      showRemoveConfirmModal: false,
    }
  },

  async mounted() {
    this.editing = false
    this.order = this.selectedOrder
  },

  computed: {
    ...mapState(['products', 'selectedOrder', 'locations']),

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
      if (this.editing)
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
      else
        return [
          {
            key: 'productName',
            label: 'Product Name',
          },
          {
            key: 'orderCount',
            label: 'Count',
          },
        ]
    },
  },

  methods: {
    pickDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    handleEditOrder() {
      this.editing = true
    },
    handleCloseEditing() {
      this.editing = false
    },
    handleSetDefault() {
      console.log('handleSetDefault')
      console.log(this.selectedOrder)
      this.order = { ...this.selectedOrder }
    },
    handleRemoveOrder() {
      console.log('handleRemoveOrder')
      this.showRemoveConfirmModal = true
    },
    handleConfirmRemove() {
      this.$store
        .dispatch('REMOVE_ORDER', this.order.id)
        .then(() => {
          this.showRemoveConfirmModal = false
        })
        .catch((e) => {
          console.log(e.message)
          this.showRemoveConfirmModal = false
        })
    },

    handleCancelRemove() {
      this.showRemoveConfirmModal = false
    },

    handleSaveUpdates() {
      console.log('handleSaveUpdates => ', this.order)
    },
  },

  watch: {
    // eslint-disable-next-line
    selectedOrder(next, prev) {
      this.editing = false
      this.order = _.cloneDeep(next)
    },
  },
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding: 10px 10px;
}

/deep/ .modal-confirm {
  & footer {
    border-top: none;
  }
}
</style>