import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { CLEAR_BRAND_FILTER, CLEAR_ORDER_BY_PRICE } from './store/types'
import Home from './pages/Home'
import ProductDetailPage from './pages/ProductDetailPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import Page404 from './pages/auth/404'
import LoginPage from './pages/auth/LoginPage'
import MainLayout from './layouts/main'
import AuthLayout from './layouts/auth'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/products',
      component: MainLayout,
      meta: {
        authRequired: false,
        hidden: true,
      },
      children: [
        {
          path: '/products',
          component: Home,
        },
        {
          path: '/products/:id',
          component: ProductDetailPage,
        },
        {
          path: '/cart',
          component: ShoppingCartPage,
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
          component: Page404,
        },
        {
          path: '/auth/login',
          meta: {
            title: 'Sign In',
          },
          component: LoginPage,
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
  console.log(to.matched)
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
  window.scrollTo(0, 0)
  store.commit(CLEAR_BRAND_FILTER)
  store.commit(CLEAR_ORDER_BY_PRICE)
})

export default router
