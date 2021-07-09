<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- <h1 class="mt-0">Available Plans</h1> -->
          <b-container align-v="center" class="container">
            <div class="mt-5">
              <b-card-group deck class="mb-3">
                <!-- card 1 -->
                <b-card
                  border-variant="default"
                  header="Freemium"
                  header-bg-variant="secondary"
                  header-text-variant="white"
                  align="center"
                  title="$0/month"
                  tag="article"
                  style="max-width: auto"
                  class="mb-5 mt-2"
                >
                  <br />
                  <b-card-text>
                    Get a free TOOLTIME subscription for 1 year by getting 3 of your friends to
                    subcribe to basic or premium
                  </b-card-text>
                  <b-list-group flush>
                    <b-list-group-item></b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >TOOLTIME
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Netflix Family
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Amazon Prime
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Spotify Family
                    </b-list-group-item>
                    <b-list-group-item></b-list-group-item>
                  </b-list-group>
                  <br />
                  <form
                    action="http://localhost:3000/admin/stripe/create-checkout-session"
                    method="POST"
                  >
                    <!-- @click="handleSubmit(priceId.basicPrice)" -->
                    <input
                      type="hidden"
                      id="basicPrice"
                      value="price_1JASGOIzukQ9tag0dbLCdWWT"
                      name="priceId"
                    />
                    <!-- <button class="btn btn-primary width-100" type="submit">Get Access</button> -->
                    <b-button type="submit" v-b-modal.modal-2 variant="secondary"
                      >Get Referral Code</b-button
                    >
                  </form>

                  <br />
                </b-card>

                <!-- card 2 -->
                <b-card
                  border-variant="primary"
                  header="Basic"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
                  title="$49/month"
                  tag="article"
                  style="max-width: auto"
                  class="mb-5 mt-2"
                >
                  <br />
                  <b-card-text>
                    Get a 1 year subscription to both TOOLTIME & Stripe. This is billed once for the
                    year <br /><br />
                  </b-card-text>
                  <b-list-group flush>
                    <b-list-group-item></b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >TOOLTIME
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >Netflix Family
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Amazon Prime
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Spotify Family
                    </b-list-group-item>
                    <b-list-group-item></b-list-group-item>
                  </b-list-group>
                  <br />

                  <form action="http://localhost:3000/stripe/create-checkout-session" method="POST">
                    <!-- @click="handleSubmit(priceId.basicPrice)" -->
                    <input
                      type="hidden"
                      id="basicPrice"
                      value="price_1JASGOIzukQ9tag0dbLCdWWT"
                      name="priceId"
                    />
                    <!-- <button class="btn btn-primary width-100" type="submit">Get Access</button> -->
                    <b-button type="submit" variant="primary">Subscribe</b-button>
                  </form>

                  <!-- <b-button v-b-modal.modal-1 variant="primary">Subscribe</b-button> -->
                  <br />
                </b-card>
                <!-- card 3 -->
                <b-card
                  border-variant="default"
                  header="Premium"
                  header-bg-variant="secondary"
                  header-text-variant="white"
                  align="center"
                  title="$99/month"
                  tag="article"
                  style="max-width: auto"
                  class="mb-5 mt-2"
                >
                  <br />
                  <b-card-text>
                    Get a 1 year subscription to TOOLTIME, Stripe and Shopify. This is billed once
                    for the year
                  </b-card-text>
                  <b-list-group flush>
                    <b-list-group-item></b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >TOOLTIME
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >Netflix Family
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-x-circle class="h5 mr-2 mb-0 mt-0"></b-icon-x-circle>Amazon Prime
                      <b-badge variant="primary" pill>coming soon</b-badge>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-icon-check2-circle
                        class="h5 mr-2 mb-0 mt-0"
                        animation="fade"
                      ></b-icon-check2-circle
                      >Spotify Family
                    </b-list-group-item>
                    <b-list-group-item></b-list-group-item>
                  </b-list-group>
                  <br />
                  <b-button v-b-modal.modal-1 variant="secondary">Subscribe</b-button>
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
  name: 'Subscription',
  data() {
    return {}
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
        // message.error(e.message)
        alert(e.message)
      }
    },
  },
}
</script>

<style scoped>
</style>
