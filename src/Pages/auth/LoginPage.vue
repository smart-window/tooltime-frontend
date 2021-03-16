<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="email"> Email Address </label>
        <input
          class="form-control"
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          aria-describedby="emailHelp"
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
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  mounted() {
    console.log('asdf')
  },
}
</script>

<style scoped>
.container {
  padding-top: 6rem;
}
</style>