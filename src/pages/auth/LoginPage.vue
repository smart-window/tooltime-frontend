<template>
  <b-container>
    <b-card class="shadow border-primary w-75 mt-5">
      <div class="row min-500">
        <div class="col-xs-12 col-md-6 d-flex justify-content-center align-items-center">
          <img class="w-100" src="@/assets/img/login.jpg" />
        </div>
        <div class="col-xs-12 col-md-6 d-flex justify-content-center align-items-center">
          <b-card-body>
            <form @submit="handleSubmit">
              <h3 style="margin-bottom: 20px" class="text-primary">
                <b>WELCOME TOOLTIME</b>
              </h3>
              <div class="form-group">
                <label for="email"> Email Address </label>
                <input
                  class="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  aria-describedby="emailHelp"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="password"> Password </label>
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  aria-describedby="password"
                  v-model="password"
                />
              </div>
              <button style="width: 100%" type="submit" class="btn btn-primary">LOGIN</button>
            </form>
            <div class="pt-2 text-center">
              <p>
                Don't have account ?
                <router-link to="/auth/register"> Sign Up </router-link>
              </p>
            </div>
          </b-card-body>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault()
      if (this.email !== '' && this.password !== '') {
        this.$store
          .dispatch('user/LOGIN', {
            payload: { email: this.email, password: this.password },
          })
          .then(() => {
            alert('You have successfully logged in!')
          })
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

.auth-body {
  width: 80% !important; // use boostrap style
  // box-shadow: 5px 5px 5px; // use boostrap class
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-52%, -52%);
}
</style>