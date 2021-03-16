import Vue from 'vue'
import App from './App.vue'
import '../custom.scss'

Vue.config.devtools = true
import store from './store'
import VueSwal from 'vue-swal'
import router from './router'

Vue.use(VueSwal)

//filters
import { brandFilter } from './filters/brandFilter'
import { formatMoney } from './filters/priceFormatter'
import { paginationPipe } from './filters/paginationFilter'
import { shortenTitle } from './filters/shortenTitle'

Vue.config.productionTip = false

Vue.filter('brandFilter', brandFilter)
Vue.filter('shortenTitle', shortenTitle)
Vue.filter('priceFormatter', formatMoney)
Vue.filter('pagination', paginationPipe)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
