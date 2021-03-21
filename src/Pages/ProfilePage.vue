<template>
  <b-container>
    <b-card>
      <b-card-title class="text-primary"> Edit Profile </b-card-title>
      <b-card-body>
        <b-form @submit="handleSubmit">
          <b-form-group id="form-group-name" label="Name" label-for="name">
            <b-form-input id="name" type="string" v-model="form.name" />
          </b-form-group>
          <b-form-group id="form-group-email" label="Email" label-for="email">
            <b-form-input id="email" type="email" v-model="form.email" />
          </b-form-group>
          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input id="address" type="string" v-model="form.address" />
          </b-form-group>
          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input id="address" type="string" v-model="form.address" />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input id="city" v-model="form.city" type="string" required />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input id="state" v-model="form.state" type="string" required />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input id="zip" v-model="form.zip" type="zip" placeholder="Enter zip" required />
          </b-form-group>
          <b-form-group id="form-group-phone" label="phone" label-for="phone">
            <b-form-input id="phone" v-model="form.phone" type="string" required />
          </b-form-group>
          <b-form-group id="form-group-stripe" label="StripId" label-for="stripeId">
            <b-form-input id="stripeId" v-model="form.stripeId" type="string" required />
          </b-form-group>
          <b-form-row>
            <b-container class="d-flex flex-row justify-content-between">
              <b-button type="submit" variant="primary"> Submit </b-button>
              <b-button type="reset"> Reset </b-button>
            </b-container>
          </b-form-row>
        </b-form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfilePage',

  mounted() {
    this.form = {
      name: this.user.name,
      email: this.user.email,
      address: this.user.address,
      city: this.user.city,
      state: this.user.state,
      zip: this.user.zip,
      phone: this.user.phone,
      stripeId: this.user.stripeId,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      form: {},
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault()
    },
  },
}
</script>