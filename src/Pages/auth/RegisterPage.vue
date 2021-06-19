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
              type="text"
              placeholder="Enter name"
              required
            />
          </b-form-group>

          <b-form-group id="form-group-zip" label="Service Area Zip" label-for="zip">
            <b-form-input placeholder="Service Area Zip" @input="selectZip" list="zip-list"></b-form-input>
            <datalist id="zip-list">
              <option v-for="location in locations" v-bind:key="location.id">
                {{ location.zip }}
              </option>
            </datalist>
          </b-form-group>

          <b-form-group id="form-group-address" label="Address" label-for="address">
            <b-form-input
              :disabled="true"
              id="address"
              type="text"
              placeholder="Address"
              v-model="this.location.address_1"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-city" label="City" label-for="city">
            <b-form-input
              :disabled="true"
              id="city"
              v-model="this.location.city"
              type="text"
              placeholder="City"
              required
            />
          </b-form-group>
          <b-form-group id="form-group-state" label="State" label-for="state">
            <b-form-input
              :disabled="true"
              id="state"
              v-model="this.location.state"
              type="text"
              placeholder="State"
              required
            />
          </b-form-group>

          <b-form-group id="form-group-phone" label="Phone" label-for="phone">
            <b-form-input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="Enter phone"
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
import { mapActions, mapState } from 'vuex'
import router from '@/router'
export default {
  name: 'RegisterPage',

  data() {
    return {
      form: {},
      location: {},
    }
  },
  computed: {
    ...mapState(['user', 'cart', 'locations']),
  },

  methods: {
    ...mapActions({
      registerUser: 'user/REGISTER',
    }),
    selectZip(zip) {
      this.location = this.locations.find((location) => {
        return location.zip === zip
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.address = this.location.address_1
      this.form.city = this.location.city
      this.form.state = this.location.state
      this.form.zip = this.location.zip

      this.registerUser(this.form)
        .then(() => {
          this.$swal(`${this.form.name} has been successfully registered!`)
          router.push('/auth/login')
        })
        .catch(() => {
          this.$swal('Registeration failed!')
        })
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