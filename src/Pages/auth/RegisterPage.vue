<template>
  <b-container>
    <b-card>
      <b-card-title class="text-primary"> Register </b-card-title>
      <b-card-body>
        <b-form @submit="handleSubmit">
          <b-form-group id="form-group-email" label="Email address" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-password" label="Password" label-for="password">
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-name" label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="string"
              placeholder="Enter name"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input
              id="address"
              v-model="form.address"
              type="string"
              placeholder="Enter address"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-city" label="city" label-for="city">
            <b-form-input
              id="city"
              v-model="form.city"
              type="string"
              placeholder="Enter city"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-state" label="state" label-for="state">
            <b-form-input
              id="state"
              v-model="form.state"
              type="string"
              placeholder="Enter state"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-zip" label="zip" label-for="zip">
            <b-form-input id="zip" v-model="form.zip" type="zip" placeholder="Enter zip" required />
          </b-form-group>
          <b-form-group id="form-group-phone" label="phone" label-for="phone">
            <b-form-input
              id="phone"
              v-model="form.phone"
              type="string"
              placeholder="Enter phone"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-stripe" label="StripId" label-for="stripeId">
            <b-form-input
              id="stripeId"
              v-model="form.stripeId"
              type="string"
              placeholder="Enter address"
              required
            />
          </b-form-group>
          <b-form-row>
            <b-container class="d-flex flex-row justify-content-between">
              <b-button type="submit" variant="primary"> Submit </b-button>
              <b-button type="reset"> Reset </b-button>
            </b-container>
          </b-form-row>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-card-body>
    </b-card>

    <div class="pt-2">
      <p>
        Do you already have account ?
        <router-link to="/auth/login"> Sign In </router-link>
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'RegisterPage',

  data() {
    return {
      form: {},
    }
  },

  mounted() {},

  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$store.dispatch('user/REGISTER', this.form)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .card {
    width: 100%;
    max-width: 500px;
  }
}
</style>