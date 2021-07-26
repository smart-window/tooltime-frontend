<template>
  <b-container>
    <b-card class="shadow border-primary w-75 mt-5 mb-5">
      <div class="row min-500">
        <div
          v-if="step != 3"
          class="col-xs-12 col-md-6 d-flex justify-content-center align-items-center"
        >
          <img class="w-100" src="@/assets/img/register_1.webp" v-show="step === 0" />
          <img class="w-100" src="@/assets/img/register_2.jpg" v-show="step === 1" />
          <img class="w-100" src="@/assets/img/register_3.jpg" v-show="step === 2" />
        </div>
        <div
          :class="
            step == 3
              ? 'col-md-12'
              : 'col-md-6' +
                ' col-xs-12 no-padding d-flex justify-content-center align-items-center'
          "
        >
          <div>
            <b-card-body class="main-body">
              <h4 style="margin-bottom: 20px" class="text-primary text-uppercase">
                <b v-if="step == 0">service area code</b>
                <b v-if="step == 1">email and password</b>
                <b v-if="step == 2">personal detail</b>
                <b v-if="step == 3">please select your plan</b>
              </h4>
              <b-form @submit="handleSubmit">
                <b-form-group
                  v-if="step == 0"
                  id="form-group-zip"
                  label="Service Area"
                  label-for="zip"
                >
                  <b-form-input
                    placeholder="Service Area"
                    @input="selectZip"
                    :state="serviceZip ? (this.location.Location['name'] ? true : false) : null"
                    list="zip-list"
                  ></b-form-input>
                  <datalist id="zip-list">
                    <option v-for="serviceArea in serviceAreas" v-bind:key="serviceArea.id">
                      {{ serviceArea.zip }}
                    </option>
                  </datalist>
                </b-form-group>

                <b-form-group v-if="getLocation != ''">
                  <b-container
                    :style="
                      serviceZip
                        ? this.location.Location['name']
                          ? 'color: #28a745'
                          : 'color: #dc3545'
                        : ''
                    "
                    class="d-inline-block text-left p-0"
                  >
                    {{ getLocation }}
                  </b-container>
                </b-form-group>
                <div v-if="step == 1">
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
                  <b-form-group
                    id="form-group-retype-password"
                    label="Re-type Password"
                    label-for="retypePassword"
                  >
                    <b-form-input
                      id="retypePassword"
                      v-model="retypePassword"
                      type="password"
                      placeholder="Re-type password"
                      required
                    />
                  </b-form-group>
                </div>
                <div v-if="step == 2">
                  <b-form-group id="form-group-name" label="Name" label-for="name">
                    <b-form-input
                      id="name"
                      v-model="form.name"
                      type="text"
                      placeholder="Enter name"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="form-group-address" label="Address" label-for="address">
                    <b-form-input
                      id="address"
                      type="text"
                      placeholder="Address"
                      v-model="form.address"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="form-group-city" label="City" label-for="city">
                    <b-form-input
                      id="city"
                      v-model="form.city"
                      type="text"
                      placeholder="City"
                      required
                    />
                  </b-form-group>
                  <b-form-group id="form-group-state" label="State" label-for="state">
                    <b-form-input
                      id="state"
                      v-model="form.state"
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
                </div>
                <BillingPlan v-if="step == 3" />

                <b-form-row>
                  <b-container class="d-inline-block text-left">
                    Do you already have account ?
                    <router-link to="/auth/login"> Sign In </router-link>
                  </b-container>
                </b-form-row>
                <b-form-row class="mt-3">
                  <b-container v-if="step == 0" class="d-flex flex-row justify-content-end">
                    <router-link to="/auth/login">
                      <b-button type="button"> Back </b-button>
                    </router-link>
                    <b-button class="ml-1" @click="nextStep" type="button" variant="primary">
                      Next
                    </b-button>
                  </b-container>
                  <b-container v-if="step == 1" class="d-flex flex-row justify-content-end">
                    <b-button @click="step--" type="button"> Back </b-button>
                    <b-button class="ml-1" @click="finalStep" type="button" variant="primary">
                      Next
                    </b-button>
                  </b-container>
                  <b-container v-if="step == 2" class="d-flex flex-row justify-content-end">
                    <b-button @click="step--" type="button"> Back </b-button>
                    <b-button class="ml-1" type="submit" variant="primary"> Submit </b-button>
                  </b-container>
                  <b-container v-if="step == 3" class="d-flex flex-row justify-content-end">
                    <b-button @click="step--" type="button"> Back </b-button>
                    <b-button class="ml-1" @click="goSignin" type="button" variant="primary">
                      Next
                    </b-button>
                  </b-container>
                </b-form-row>
              </b-form>
            </b-card-body>
          </div>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'
import * as api from '@/services/api'
import BillingPlan from '../BillingPlan.vue'

export default {
  name: 'RegisterPage',
  components: {
    BillingPlan,
  },
  data() {
    return {
      form: {},
      location: { Location: {} },
      serviceAreas: [],
      step: 0,
      retypePassword: null,
      serviceZip: '',
    }
  },
  computed: {
    ...mapState(['user', 'cart', 'locations']),
    getLocation() {
      if (!this.serviceZip) {
        return ''
      } else if (this.serviceZip && !this.location.Location['name']) {
        return 'Location: Not valid zip code.'
      } else {
        return (
          'Location: ' +
          this.location.Location.zip +
          ', ' +
          this.location.Location.address_1 +
          ', ' +
          this.location.Location.city +
          ', ' +
          this.location.Location.state
        )
      }
    },
  },

  async mounted() {
    this.serviceAreas = await api.getServiceAreas()
    if (this.$route.query.session_id) {
      this.step = 3
    }
  },

  methods: {
    ...mapActions({
      registerUser: 'user/REGISTER',
    }),
    goSignin() {
      router.push('/auth/login')
    },
    selectZip(zip) {
      this.serviceZip = zip
      this.location = this.serviceAreas.find((serviceArea) => {
        if (serviceArea.zip === Number(zip)) {
          return serviceArea.Location
        }
      })
      if (!this.location) {
        this.location = { Location: {} }
      }
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.address = this.location.Location.address_1
      this.form.city = this.location.Location.city
      this.form.state = this.location.Location.state
      this.form.zip = this.location.zip

      this.registerUser(this.form)
        .then(() => {
          this.$swal(`${this.form.name} has been successfully registered!`)
          this.step++
          this.$store.dispatch('user/LOGIN', {
            payload: { email: this.form.email, password: this.form.password },
          })
        })
        .catch(() => {
          this.$swal('Registeration failed!')
        })
    },
    nextStep() {
      if ('city' in this.location.Location) {
        this.step++
      } else {
        alert('Please select service area.')
      }
    },
    finalStep() {
      if (!this.form.email) {
        alert('Please fill the email')
      } else if (!this.form.password) {
        alert('Please fill the password')
      } else if (this.form.password != this.retypePassword) {
        alert('Password is not correct')
      } else {
        this.step++
      }
    },
    subscriptionStep() {
      if (!this.form.name) {
        alert('Please fill the name')
      } else if (!this.form.address) {
        alert('Please fill the address')
      } else {
        this.step++
      }
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
  }
}
</style>