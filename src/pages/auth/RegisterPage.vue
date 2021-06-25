<template>
  <b-container>
    <b-card class="shadow border-primary w-75 mt-5">
      <div class="row min-500">
        <div class="col-xs-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            class="w-100"
            :src="
              step == 0
                ? 'https://i.pinimg.com/originals/19/86/f6/1986f62ce5081824a38fe780dee36599.jpg'
                : step == 1
                ? 'https://dscxx9mer61ho.cloudfront.net/wp-content/uploads/Car-2-60.jpg'
                : 'https://www.bigfatlogos.com/wp-content/themes/dpmg-theme/library/timthumb.php?src=https://www.bigfatlogos.com/wp-content/uploads/2009/09/vehicle-wrap-dewalt.jpg&w=630&h=378&zc=1'
            "
          />
        </div>
        <div class="col-6 no-padding">
          <div>
            <b-card-body class="main-body">
              <h4 style="margin-bottom: 20px" class="text-primary">
                <b>{{
                  step == 0
                    ? 'Enter your service area code'
                    : step == 1
                    ? 'Enter your email and password'
                    : 'Enter your personal detail'
                }}</b>
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
                    class="d-inline-block text-left"
                  >
                    {{ getLocation }}
                  </b-container>
                </b-form-group>

                <b-form-group
                  v-if="step == 1"
                  id="form-group-email"
                  label="Email address"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </b-form-group>
                <b-form-group
                  v-if="step == 1"
                  id="form-group-password"
                  label="Password"
                  label-for="password"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                  />
                </b-form-group>
                <b-form-group
                  v-if="step == 1"
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
                <b-form-group v-if="step == 2" id="form-group-name" label="Name" label-for="name">
                  <b-form-input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter name"
                    required
                  />
                </b-form-group>

                <b-form-group
                  v-if="step == 2"
                  id="form-group-address"
                  label="Address"
                  label-for="address"
                >
                  <b-form-input
                    id="address"
                    type="text"
                    placeholder="Address"
                    v-model="form.address"
                    required
                  />
                </b-form-group>
                <b-form-group v-if="step == 2" id="form-group-city" label="City" label-for="city">
                  <b-form-input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="City"
                    required
                  />
                </b-form-group>
                <b-form-group
                  v-if="step == 2"
                  id="form-group-state"
                  label="State"
                  label-for="state"
                >
                  <b-form-input
                    id="state"
                    v-model="form.state"
                    type="text"
                    placeholder="State"
                    required
                  />
                </b-form-group>

                <b-form-group
                  v-if="step == 2"
                  id="form-group-phone"
                  label="Phone"
                  label-for="phone"
                >
                  <b-form-input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="Enter phone"
                    required
                  />
                </b-form-group>
                <b-form-row>
                  <b-container class="d-inline-block text-left">
                    Do you already have account ?
                    <router-link to="/auth/login"> Sign In </router-link>
                  </b-container>
                </b-form-row>
                <b-form-row>
                  <b-container v-if="step == 0" class="d-flex flex-row justify-content-end mt-3">
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

export default {
  name: 'RegisterPage',
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
    console.log(this.serviceAreas)
  },

  methods: {
    ...mapActions({
      registerUser: 'user/REGISTER',
    }),
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
          router.push('/auth/login')
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