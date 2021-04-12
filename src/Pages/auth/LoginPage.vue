<template>
  <b-container>
    <b-card class="border-primary">
      <b-card-header class="bg-primary text-white">Login</b-card-header>
      <b-card-body>
        <form @submit="handleSubmit">
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </b-card-body>
    </b-card>

    <div class="pt-2">
      <p>
        Don't have account ?
        <router-link to="/auth/register"> Sign Up </router-link>
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'LoginPage',

  mounted() {},

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
        this.$store.dispatch('user/LOGIN', {
          payload: { email: this.email, password: this.password },
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
    max-width: 500px;
  }
}
</style>