<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="email"> Email Address </label>
        <input type="email" id="email" placeholder="Enter email" aria-describedby="emailHelp" />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="password"> Password </label>
        <input type="password" id="password" placeholder="Password" aria-describedby="password" />
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
</style>