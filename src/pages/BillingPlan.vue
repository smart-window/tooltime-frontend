<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <b-container align-v="center" class="container">
              <div class="mt-5">
                <b-card-group deck class="mb-3">
                  <b-card
                    v-for="plan in plans"
                    v-bind:key="plan.id"
                    :bg-variant="isSubscribedPlan(plan) ? 'primary' : ''"
                    :border-variant="isSubscribedPlan(plan) ? 'primary' : 'primary'"
                    :text-variant="isSubscribedPlan(plan) ? 'light' : ''"
                    align="center"
                    tag="article"
                    style="max-width: auto"
                    :class="
                      'mb-5 mt-2 ' + (isSubscribedPlan(plan) ? 'subscribed' : 'no-subscribed')
                    "
                  >
                    <b-card-header>
                      {{ plan.nickname }}
                    </b-card-header>
                    <b-card-title>
                      $<label class="price_title">{{ plan.unit_amount / 100 }}</label> /{{
                        plan.recurring.interval
                      }}
                    </b-card-title>
                    <br />
                    <b-card-text> {{ plan.product.description }}<br /><br /> </b-card-text>
                    <br />
                    <b-form v-if="!user.priceId" :action="apiURL" method="POST">
                      <b-button type="submit" variant="outline-secondary">Subscribe</b-button>
                      <input type="hidden" :value="plan.id" name="priceId" />
                      <input type="hidden" :value="routeName" name="routeName" />
                    </b-form>
                    <b-form v-if="isSubscribedPlan(plan)" method="POST">
                      <b-button @click="cancelSubscription" variant="outline-light">
                        Cancel</b-button
                      >
                      <input type="hidden" :value="user.subscriptionId" name="subscriptionId" />
                    </b-form>
                    <b-form v-if="user.priceId && !isSubscribedPlan(plan)" method="POST">
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
    </b-overlay>
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
      loading: false,
    }
  },
  computed: {
    ...mapState(['user']),
    routeName() {
      return this.$route.path
    },
    apiURL() {
      return config.API_URL + '/stripe/create-checkout-session'
    },
  },
  async mounted() {
    if (this.$route.query.session_id) {
      this.handleSubmit()
    }
    this.loading = true
    const config = await api.getConfig()
    this.loading = false
    this.plans = config.prices.data

    this.plans
      .sort(function (a, b) {
        return b.unit_amount - a.unit_amount
      })
      .reverse()
  },
  methods: {
    toast(variant, toaster, title, content, append = false) {
      this.$bvToast.toast(content, {
        title: title,
        toaster: toaster,
        solid: true,
        variant: variant,

        appendToast: append,
      })
    },

    isSubscribedPlan(plan) {
      return plan.id === this.user.priceId
    },

    async cancelSubscription() {
      this.loading = true
      try {
        const res = await api.cancelSubscription({ subscriptionId: this.user.subscriptionId })
        if (res) {
          this.$store
            .dispatch('UPDATE_PROFILE', { priceId: null, subscriptionId: null })
            .then(() => {
              route.push(`/billing-plan`)
              this.toast(
                'success',
                'b-toaster-top-center',
                'Success',
                'You canceled your subscription.',
              )
              this.loading = false
            })
            .catch((e) => {
              throw new Error(e.message)
            })
        }
      } catch (e) {
        console.log(e.message)
        this.toast(
          'error',
          'b-toaster-top-center',
          'Error',
          e.message || 'Cancel subscription failed.',
        )
        this.loading = false
      }
    },

    async updateSubscription(priceId) {
      this.loading = true
      try {
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
              this.toast(
                'success',
                'b-toaster-top-center',
                'Success',
                'You update your subscription.',
              )
              this.loading = false
            })
            .catch((e) => {
              throw new Error(e.message)
            })
        }
      } catch (e) {
        console.log(e.message)
        this.toast(
          'error',
          'b-toaster-top-center',
          'Error',
          e.message || 'Cancel subscription failed.',
        )
        this.loading = false
      }
    },

    async handleSubmit() {
      try {
        const res = await api.checkoutSession(this.$route.query.session_id)
        this.$store
          .dispatch('UPDATE_PROFILE', { priceId: res.plan.id, subscriptionId: res.id })
          .then(() => {
            this.toast(
              'success',
              'b-toaster-top-center',
              'Success',
              'Congratuations! You phurchased a plan!',
            )
          })
          .catch(() => {})
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/mixins.scss';
.subscribed {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px 2px grey;
}
.card-header {
  border-bottom: none !important;
  background: none;
  margin: 0;
}
.subscribed .card-title {
  color: white;
}
.no-subscribed .card-title {
  color: $primary;
}
.price_title {
  font-size: 2rem;
}
</style>
