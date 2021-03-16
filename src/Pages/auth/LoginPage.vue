<template>
  <div class="container">
    <div class="card border-primary">
      <div class="card-header bg-primary text-white">Login</div>
      <div class="card-body">
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
      </div>
    </div>

    <div class="pt-2">
      <p>
        Don't have account ?
        <router-link to="/auth/register"> Sign Up </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  mounted() {
    console.log('asdf')
  },

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