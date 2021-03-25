<template>
  <b-card no-body>
    <b-card-header>
      <h3 class="text-primary">Order List</h3>
    </b-card-header>
    <b-card-body class="order-list-wrapper">
      <ul class="order-list">
        <li>Pressure Washer <b-badge pill variant="success">6</b-badge></li>
        <li>Compressor <b-badge pill variant="success">1</b-badge></li>
        <li>Grinder <b-badge pill variant="success">4</b-badge></li>
        <li>
          20V MAX* XR 1/2 IN. BRUSHLESS HAMMER DRILL/DRIVER
          <b-badge pill variant="success">3</b-badge>
        </li>
      </ul>
    </b-card-body>
    <b-card-body> </b-card-body>
  </b-card>
</template>

<style scoped lang="scss">
order-list-wrapper {
  padding: 0px;
}

ul.order-list {
  padding: 0px;
  & li {
    list-style: none;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
