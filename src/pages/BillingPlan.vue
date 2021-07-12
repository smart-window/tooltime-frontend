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
                  :header="plan.title"
                  :header-bg-variant="plan.style"
                  header-text-variant="white"
                  align="center"
                  :title="'$' + plan.price + '/month'"
                  tag="article"
                  style="max-width: auto"
                  class="mb-5 mt-2"
                >
                  <br />
                  <b-card-text> {{ plan.description }}<br /><br /> </b-card-text>
                  <br />

                  <form action="http://localhost:3000/stripe/create-checkout-session" method="POST">
                    <input
                      type="hidden"
                      id="basicPrice"
                      value="price_1JASGOIzukQ9tag0dbLCdWWT"
                      name="priceId"
                    />
                    <b-button type="submit" :variant="plan.style">Subscribe</b-button>
                  </form>

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

export default {
  name: 'BillingPlan',
  data() {
    return {
      plans: [
        {
          title: 'Free Plan',
          price: 0,
          description: 'This is a free plan',
          style: 'secondary',
        },
        {
          title: 'Basic Plan',
          price: 49,
          description: 'This is a basic plan',
          style: 'primary',
        },
        {
          title: 'Premiun Plan',
          price: 99,
          description: 'This is a premium plan',
          style: 'secondary',
        },
      ],
    }
  },
  mounted() {
    if (this.$route.query.session_id) {
      this.handleSubmit()
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await api.checkoutSession(this.$route.query.session_id)
        console.log(res)
        alert('Congratuations! You phurchased a plan!')
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>

<style scoped>
</style>
