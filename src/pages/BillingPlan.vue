<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- <h1 class="mt-0">Available Plans</h1> -->
          <b-container align-v="center" class="container">
            <div class="mt-5">
              <b-card-group deck class="mb-3">
                <b-card
                  v-for="plan in plans"
                  v-bind:key="plan.price"
                  :border-variant="plan.style"
                  :header="plan.product.name"
                  :header-bg-variant="plan.style"
                  header-text-variant="white"
                  align="center"
                  :title="'$' + plan.unit_amount / 100 + '/month'"
                  tag="article"
                  style="max-width: auto"
                  class="mb-5 mt-2"
                >
                  <br />
                  <b-card-text> {{ plan.product.description }}<br /><br /> </b-card-text>
                  <br />
                  <b-form v-if="!user.priceId" :action="apiURL" method="POST">
                    <b-button type="submit" :variant="plan.style">Subscribe</b-button>
                    <input type="hidden" id="basicPrice" :value="plan.id" name="priceId" />
                  </b-form>
                  <b-form v-if="user.priceId == plan.id" :action="apiURL" method="POST">
                    <b-button type="submit" :variant="plan.style">Cancel</b-button>
                    <input type="hidden" id="basicPrice" :value="plan.id" name="priceId" />
                  </b-form>
                  <b-form
                    v-if="user.priceId && user.priceId != plan.id"
                    :action="apiURL"
                    method="POST"
                  >
                    <b-button type="submit" :variant="plan.style">Subscribe</b-button>
                    <input type="hidden" id="basicPrice" :value="plan.id" name="priceId" />
                  </b-form>

                  <br />
                </b-card>
              </b-card-group>
            </div>
            <!-- card 1 ends here-->
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
  },
  async mounted() {
    console.log(this.user)
    if (this.$route.query.session_id) {
      this.handleSubmit()
    }
    const config = await api.getConfig()
    this.plans = config.prices.data
    this.plans.map((plan) => {
      plan.style = 'primary'
      return plan
    })
    console.log(this.plans)
    this.plans.sort(function (a, b) {
      return b.unit_amount - a.unit_amount
    })
    this.plans.reverse()
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await api.checkoutSession(this.$route.query.session_id)
        // await api.updateProfile(id, { priceId: res.plan.id })
        this.$store
          .dispatch('UPDATE_PROFILE', { priceId: res.plan.id })
          .then((res) => {
            console.log(res)
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
</style>
