import Vue from 'vue'
import App from './App.vue'
import './styles/global.scss'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.devtools = true
import store from './store'
import VueSwal from 'vue-swal'
import router from './router'

import { BootstrapVue } from 'bootstrap-vue'
import Antd from 'ant-design-vue';
import Notifications from 'vue-notification'

Vue.use(VueSwal)
Vue.use(BootstrapVue)
Vue.use(Antd)
Vue.use(Notifications)

Vue.prototype.$notification = Notifications
// mocking api
// import './services/axios/fakeApi'

//filters
import { brandFilter } from './filters/brandFilter'
import { paginationPipe } from './filters/paginationFilter'
import { shortenTitle } from './filters/shortenTitle'

Vue.config.productionTip = false

Vue.filter('brandFilter', brandFilter)
Vue.filter('shortenTitle', shortenTitle)
Vue.filter('pagination', paginationPipe)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
