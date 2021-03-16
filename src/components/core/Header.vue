<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-white fixed-top border-bottom-1 border-primary shadow"
  >
    <div class="container">
      <router-link to="/products" class="navbar-brand text-primary"> TOOLTIME </router-link>
      <div>
        <ul class="navbar-nav ml-auto text-primary">
          <li class="nav-item">
            <router-link to="/cart">
              <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>Cart ({{
                $store.getters.cartLength
              }})
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
</style>
