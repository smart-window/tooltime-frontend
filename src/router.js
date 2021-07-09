import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { CLEAR_BRAND_FILTER, CLEAR_ORDER_BY_PRICE } from './store/types'
import Home from './pages/Home'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import PageNotFound from './pages/auth/404'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import MainLayout from './layouts/main'
import AuthLayout from './layouts/auth'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import Alert from './pages/Alert'
import Dashboard from './pages/Dashboard'
import BillingPlan from './pages/BillingPlan'
var ping = require('ping')
Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/alert',
      component: Alert,
    },
    {
      path: '/',
      redirect: '/',
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        {
          path: '/',
          component: Dashboard,
        },
        {
          path: '/billing-plan',
          component: BillingPlan,
        },
        {
          path: '/products',
          component: Home,
        },
        {
          path: '/product/:id',
          component: ProductDetailPage,
        },
        {
          path: '/cart',
          component: ShoppingCartPage,
        },
        {
          path: '/profile',
          component: ProfilePage,
        },
        {
          path: '/order',
          component: OrderPage,
        },
        {
          path: '/order/:id',
          component: OrderPage,
        },
      ],
    },

    {
      path: '/auth',
      redirect: 'auth/login',
      component: AuthLayout,
      children: [
        {
          path: '/auth/404',
          meta: {
            title: 'Error 404',
          },
          component: PageNotFound,
        },
        {
          path: '/auth/login',
          meta: {
            title: 'Sign In',
          },
          component: LoginPage,
        },
        {
          path: '/auth/register',
          meta: {
            title: 'Sign In',
          },
          component: RegisterPage,
        },
      ],
    },

    // Redirect to 404
    {
      path: '*',
      redirect: 'auth/404',
      hidden: true,
    },
  ],
})

router.beforeEach((to, from, next) => {
  var cfg = {
    timeout: 10,
    // WARNING: -i 2 may not work in other platform like windows
    extra: ['-i', '2'],
  }

  var hosts = ['google.com', '8.8.4.4'];
  hosts.forEach(async (host) => {
    await ping.sys.probe(host, function (isAlive) {
      var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
      return msg
    }, cfg)
  })

  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user.authorized) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // window.scrollTo(0, 0)
  store.commit(CLEAR_BRAND_FILTER)
  store.commit(CLEAR_ORDER_BY_PRICE)
})

export default router
