<template>
  <b-container>
    <b-card>
      <b-card-title class="text-primary"> Edit Profile </b-card-title>
      <b-card-body>
        <b-form v-if="!editing">
          <b-form-group id="form-group-name" label="Name" label-for="name">
            <b-form-input id="name" type="text" v-model="form.name" readonly />
          </b-form-group>
          <b-form-group id="form-group-email" label="Email" label-for="email">
            <b-form-input id="email" type="email" v-model="form.email" readonly />
          </b-form-group>
          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input id="address" type="text" v-model="form.address" readonly />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input id="city" v-model="form.city" type="text" readonly />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input id="state" v-model="form.state" type="text" readonly />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input
              id="zip"
              v-model="form.zip"
              type="number"
              placeholder="Enter zip"
              readonly
            />
          </b-form-group>
          <b-form-group id="form-group-phone" label="phone" label-for="phone">
            <b-form-input id="phone" v-model="form.phone" type="text" readonly />
          </b-form-group>
          <b-form-group id="form-group-stripe" label="StripId" label-for="stripeId">
            <b-form-input id="stripeId" v-model="form.stripeId" type="text" readonly />
          </b-form-group>
          <b-form-row>
            <b-container class="d-flex flex-row justify-content-between">
              <b-button @click="handleEdit" variant="primary">
                <i class="fas fa-edit"> </i> Edit
              </b-button>
            </b-container>
          </b-form-row>
        </b-form>

        <b-form @submit="handleSubmit" v-if="editing">
          <b-form-group id="form-group-name" label="Name" label-for="name">
            <b-form-input id="name" type="text" v-model="form.name" />
          </b-form-group>
          <b-form-group id="form-group-email" label="Email" label-for="email">
            <b-form-input id="email" type="email" v-model="form.email" readonly />
          </b-form-group>
          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input id="address" type="text" v-model="form.address" required />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input id="city" v-model="form.city" type="text" required />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input id="state" v-model="form.state" type="text" required />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input
              id="zip"
              v-model="form.zip"
              type="number"
              placeholder="Enter zip"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-phone" label="phone" label-for="phone">
            <b-form-input id="phone" v-model="form.phone" type="text" required />
          </b-form-group>
          <b-form-group id="form-group-stripe" label="StripId" label-for="stripeId">
            <b-form-input id="stripeId" v-model="form.stripeId" type="text" required />
          </b-form-group>
          <b-form-row>
            <b-container class="d-flex flex-row justify-content-between">
              <b-button type="submit" variant="primary">
                <i class="fas fa-save"> </i> Submit
              </b-button>
              <b-button @click="handleCloseEdit" type="reset">
                <i class="fas fa-times"> </i> Cancel
              </b-button>
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
    this.editing = false
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      form: {},
      editing: false,
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$store
        .dispatch('UPDATE_PROFILE', this.form)
        .then(() => {
          console.log('asdf')
          this.$swal('Profile updated')
          this.editing = false
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    handleEdit() {
      this.editing = true
    },
    handleCloseEdit() {
      this.editing = false
    },
  },
}
</script>