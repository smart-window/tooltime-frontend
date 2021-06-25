<template>
  <div>
    <b-card v-if="order.id === undefined">
      <b-card-body> <h3 class="text-primary">Select Order to see the details</h3> </b-card-body>
    </b-card>
    <b-card no-body class="order-detail" v-if="order.id !== undefined">
      <!-- <b-card-title> -->
      <!-- </b-card-title> -->
      <b-card-body class="order-list-wrapper" v-if="!editing">
        <h2 class="text-primary mt-4 mb-3">{{ orderTitle }}</h2>
        <p>
          <span> <i class="far fa-envelope"></i> </span>&nbsp;&nbsp; {{ order.email }}
        </p>
        <p>
          <span><i class="fas fa-phone-alt"></i> </span>&nbsp;&nbsp; {{ order.phone }}
        </p>
        <p>
          <span> <i class="fas fa-map-marker-alt"></i> </span>&nbsp;&nbsp; {{ order.address }},{{
            order.city
          }},
          {{ order.state }}
        </p>
        <p>
          <span> <i class="fas fa-calendar-alt"></i> </span>&nbsp;&nbsp;
          {{ pickDate(order.pickupDate) }}
        </p>
        <p>
          <span> <i class="fas fa-house-user"></i> </span>&nbsp;&nbsp; Agency
          <b-select v-model="order.locationId" disabled>
            <b-select-option
              :value="location.id"
              v-for="location in locations"
              v-bind:key="location.id"
            >
              {{ location.name }}
            </b-select-option>
          </b-select>
        </p>
        <p>
          <span> <i class="far fa-clipboard"></i>&nbsp;&nbsp; Notes </span>
          <b-textarea v-model="order.notes" debounce="500" disabled> </b-textarea>
        </p>
        <b-table striped hover :items="orderItems" :fields="orderFields">
          <template #cell(no)="row">
            {{ row.index + 1 }}
          </template>
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
            <b-form-input id="address" type="text" v-model="order.address" readonly />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input id="city" type="text" v-model="order.city" readonly />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input id="state" type="text" v-model="order.state" readonly />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input id="zip" type="text" v-model="order.zip" readonly />
          </b-form-group>
          <b-form-group id="form-group-location" label="location" label-for="location">
            <b-form-select id="location" v-model="order.locationId" disabled>
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
          <template #cell(no)="row">
            {{ row.index + 1 }}
          </template>
          <template #cell(productName)="row">
            <router-link :to="`/product/${row.item.productId}`"> {{ row.value }} </router-link>
          </template>
          <template #cell(orderCount)="row">
            <b-form-spinbutton
              v-model="row.item.orderCount"
              @change="handleChangeOrderCount(row.item)"
            >
            </b-form-spinbutton>
          </template>
          <template #cell(actions)="row">
            <b-button @click="handleClickRemoveOrderItem(row.item)" class="btn btn-danger">
              <span> <i class="fas fa-trash-alt"></i> </span>
            </b-button>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
    <b-row class="order-footer" v-if="order.id !== undefined">
      <b-container class="d-flex flex-row justify-content-between pt-2 pb-2" v-if="!editing">
        <b-button variant="primary" @click="handleEditOrder">
          <i class="fas fa-edit"> </i> Edit
        </b-button>
        <b-button @click="handleClickRemoveOrder">
          <i class="fas fa-trash-alt"> </i> Remove
        </b-button>
      </b-container>
      <b-container class="d-flex flex-row justify-content-between pt-2 pb-2" v-if="editing">
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
          <b-button @click="handleConfirmRemoveOrder" variant="primary" class="btn btn-primary">
            Yes
          </b-button>
          <b-button @click="handleCancelRemoveOrder" class="btn btn-secondary"> No </b-button>
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
      return (this.order.OrderItems || [])
        .map((order) => {
          const product = this.products.find((product) => product.id === order.productId)
          if (product === undefined) return null
          return {
            id: order.id,
            productId: product.id,
            productName: product.name,
            images: product.images.split(','),
            orderCount: order.orderCount,
          }
        })
        .filter((orderItem) => orderItem !== null)
    },

    orderFields() {
      if (this.editing)
        return [
          {
            key: 'no',
            label: 'No',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
          {
            key: 'productName',
            label: 'Product Name',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
          {
            key: 'orderCount',
            label: 'Count',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
          {
            key: 'actions',
            label: 'Actions',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
        ]
      else
        return [
          {
            key: 'no',
            label: 'No',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
          {
            key: 'productName',
            label: 'Product Name',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
          },
          {
            key: 'orderCount',
            label: 'Count',
            tdClass: 'border border-custom',
            thClass: 'border border-custom',
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
      this.order = { ...this.selectedOrder }
    },
    handleClickRemoveOrder() {
      this.showRemoveConfirmModal = true
    },
    handleConfirmRemoveOrder() {
      this.$store
        .dispatch('REMOVE_ORDER', this.order.id)
        .then(() => {
          this.showRemoveConfirmModal = false
        })
        .catch(() => {
          this.showRemoveConfirmModal = false
        })
    },
    handleCancelRemoveOrder() {
      this.showRemoveConfirmModal = false
    },
    handleClickRemoveOrderItem(orderItem) {
      if (this.orderItems.length <= 1) {
        this.$swal("Can't remove the item")
        return
      }
      this.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete order item.', {
          title: 'Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((confirmed) => {
          if (confirmed) {
            this.$store
              .dispatch('REMOVE_ORDER_ITEM', orderItem.id)
              .then(() => {
                this.$swal('OrderItem has been updated!')
                this.order.OrderItems = _.cloneDeep(this.order.OrderItems).filter(
                  (oitem) => oitem.id !== orderItem.id,
                )
                this.editing = false
              })
              .catch(() => {})
          }
        })
        .catch(() => {})
    },
    handleSaveUpdates() {
      this.$store
        .dispatch('UPDATE_ORDER', { orderId: this.order.id, newOrder: this.order })
        .then(() => {
          this.$swal('Order has been updated!')
          this.editing = false
        })
        .catch(() => {})
    },
    handleChangeOrderCount(updated) {
      const updatedId = this.order.OrderItems.findIndex((item) => {
        return item.id === updated.id
      })
      if (updatedId !== -1) this.order.OrderItems[updatedId] = updated
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
.border-custom {
  color: black !important;
  border: 1px solid black !important;
}

ul {
  margin: 0;
}
.card-body {
  padding: 0;
}
.card-body p {
  margin-bottom: 1.5rem;
}
.order-detail,
.order-footer {
  padding: 10px 50px !important;
}

/deep/ .modal-confirm {
  & footer {
    border-top: none;
  }
}
</style>