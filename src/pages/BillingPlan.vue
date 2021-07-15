<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <b-container align-v="center" class="container">
            <div class="mt-5">
              <b-card-group deck class="mb-3">
                <b-card
                  v-for="plan in plans"
                  v-bind:key="plan.price"
                  :title="'$' + plan.unit_amount / 100 + '/month'"
                  :header="plan.product.name"
                  :header-bg-variant="user.priceId == plan.id ? 'primary' : 'white'"
                  :header-text-variant="user.priceId == plan.id ? 'white' : 'primary'"
                  :bg-variant="user.priceId == plan.id ? 'primary' : ''"
                  :border-variant="user.priceId == plan.id ? 'primary' : 'primary'"
                  :text-variant="user.priceId == plan.id ? 'light' : ''"
                  align="center"
                  tag="article"
                  style="max-width: auto"
                  :class="'mb-5 mt-2 ' + (user.priceId == plan.id ? 'subscribed' : '')"
                >
                  <br />
                  <b-card-text> {{ plan.product.description }}<br /><br /> </b-card-text>
                  <br />
                  <b-form v-if="!user.priceId" :action="apiURL" method="POST">
                    <b-button type="submit" variant="outline-secondary">Subscribe</b-button>
                    <input type="hidden" :value="plan.id" name="priceId" />
                  </b-form>
                  <b-form v-if="user.priceId == plan.id" :action="cancelApiURL" method="POST">
                    <b-button @click="cancelSubscription" variant="outline-light">Cancel</b-button>
                    <input type="hidden" :value="user.subscriptionId" name="subscriptionId" />
                  </b-form>
                  <b-form
                    v-if="user.priceId && user.priceId != plan.id"
                    :action="apiURL"
                    method="POST"
                  >
                    <b-button @click="updateSubscription(plan.id)" variant="outline-secondary"
                      >Subscribe</b-button
                    >
                    <input type="hidden" :value="plan.id" name="priceId" />
                  </b-form>

                  <br />
                </b-card>
              </b-card-group>
            </div>
          </b-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api'
import config from '@/config'
import { mapState } from 'vuex'
import route from '@/router'

export default {
  name: 'BillingPlan',
  data() {
    return {
      plans: [],
    }
  },
  computed: {
    ...mapState(['user']),

    apiURL() {
      return config.API_URL + '/stripe/create-checkout-session'
    },
    // cancelApiURL() {
    //   return config.API_URL + '/stripe/cancel-subscription'
    // },
  },
  async mounted() {
    if (this.$route.query.session_id) {
      this.handleSubmit()
    }
    const config = await api.getConfig()
    this.plans = config.prices.data

    this.plans.sort(function (a, b) {
      return b.unit_amount - a.unit_amount
    })
    this.plans.reverse()
  },
  methods: {
    async cancelSubscription() {
      const res = await api.cancelSubscription({ subscriptionId: this.user.subscriptionId })
      if (res) {
        this.$store
          .dispatch('UPDATE_PROFILE', { priceId: null, subscriptionId: null })
          .then(() => {
            route.push(`/billing-plan`)
            alert('You canceled your subscription.')
          })
          .catch(() => {})
      }
    },
    async updateSubscription(priceId) {
      const res = await api.updateSubscription({
        subscriptionId: this.user.subscriptionId,
        priceId: priceId,
      })
      if (res) {
        this.$store
          .dispatch('UPDATE_PROFILE', {
            priceId: priceId,
            subscriptionId: this.user.subscriptionId,
          })
          .then(() => {
            route.push(`/billing-plan`)
            alert('You update your subscription.')
          })
          .catch(() => {})
      }
    },
    async handleSubmit() {
      try {
        const res = await api.checkoutSession(this.$route.query.session_id)
        this.$store
          .dispatch('UPDATE_PROFILE', { priceId: res.plan.id, subscriptionId: res.id })
          .then(() => {
            alert('Congratuations! You phurchased a plan!')
          })
          .catch(() => {})
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>

<style scoped>
.subscribed {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px 2px grey;
}
.subscribed .card-title {
  color: white;
}
</style>
