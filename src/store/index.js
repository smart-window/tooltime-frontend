import Vue from 'vue'
import Vuex from 'vuex'
import * as Types from './types'
import { paginationPipe } from '../filters/paginationFilter'
import user from './user'
import * as api from '../services/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user,
  },
  state: {
    products: [],
    categories: [],
    locations: [],
    cart: [],
    orders: [],
    categoryFilter: [],
    orderBy: '',
    perPage: 12,
    currentPage: 1,
    pagesToShow: 3,
  },
  mutations: {
    [Types.ADD_PRODUCT_TO_CART](state, product) {
      console.log('Types.ADD_PRODUCT_TO_CART =>', product)
      const cartItemIndex = state.cart.findIndex(item => item.id === product.id)

      if (cartItemIndex < 0) {
        state.cart.push({ ...product, quantity: 1 })
      } else {
        if (state.cart[cartItemIndex].quantity === 10) return void 0
        state.cart[cartItemIndex].quantity++
      }
    },
    [Types.REMOVE_PRODUCT_FROM_CART](state, id) {
      const cartItemIndex = state.cart.findIndex(item => item.id === id)

      state.cart.splice(cartItemIndex, 1)
    },
    [Types.INCREMENT_CART_ITEM_QUANTITY](state, id) {
      const cartItemIndex = state.cart.findIndex(item => item.id === id)
      window.console.log(state.cart[cartItemIndex])
      if (state.cart[cartItemIndex].quantity === 10) return void 0
      state.cart[cartItemIndex].quantity++
    },
    [Types.DECREMENT_CART_ITEM_QUANTITY](state, id) {
      const cartItemIndex = state.cart.findIndex(item => item.id === id)
      if (state.cart[cartItemIndex].quantity === 1) return void 0
      state.cart[cartItemIndex].quantity--
    },
    [Types.PREV_PAGE](state) {
      state.currentPage--
    },
    [Types.NEXT_PAGE](state) {
      state.currentPage++
    },
    [Types.GO_PAGE](state, payload) {
      state.currentPage = payload
    },
    [Types.ORDER_BY_ASC](state) {
      state.orderBy = 'asc'
    },
    [Types.ORDER_BY_DESC](state) {
      state.orderBy = 'desc'
    },
    [Types.CLEAR_ORDER_BY_PRICE](state) {
      state.orderBy = ''
    },
    [Types.ADD_CATEGORY_TO_FILTER](state, categoryId) {
      console.log('type of state.categoryFilter', typeof state.categoryFilter)
      const filters = state.categoryFilter
      if (filters.includes(categoryId)) return void 0

      filters.push(categoryId)
      state.categoryFilter = filters
    },
    [Types.REMOVE_CATEGORY_FROM_FILTER](state, categoryId) {
      const filters = state.categoryFilter
      state.categoryFilter = filters.filter(filterId => filterId !== categoryId)
    },
    [Types.CLEAR_BRAND_FILTER](state) {
      state.categoryFilter = []
    },
    [Types.SET_CART](state, cartItems) {
      state.cart = cartItems
    },
    [Types.SET_PRODUCTS](state, products) {
      state.products = products
    },
    [Types.SET_CATEGORIES](state, categories) {
      console.log('[Types.SET_CATEGORIES] => ', categories)
      state.categories = categories
    },
    [Types.SET_LOCATIONS](state, locations) {
      console.log('[Types.SET_CATEGORIES] => ', locations)
      state.locations = locations
    },
    [Types.SET_ORDERS](state, orders) {
      console.log('[Types.SET_ORDERS] => ', orders)
      state.orders = orders
    },
  },

  actions: {
    async LOAD_PRODUCTS({ commit }) {
      const products = await api.getProducts()
      commit(Types.SET_PRODUCTS, products)
    },

    async LOAD_CATEGORIES({ commit }) {
      const categories = await api.getCategories()
      console.log('categories => ', categories)
      commit(Types.SET_CATEGORIES, categories)
    },
    async LOAD_LOCATIONS({ commit }) {
      const locations = await api.getLocations()
      console.log('categories => ', locations)
      commit(Types.SET_LOCATIONS, locations)
    },
    async LOAD_ORDERS({ commit }) {
      const orders = await api.getOrders()
      console.log('orders => ', orders)
      commit(Types.SET_ORDERS, orders)
    },
    async CREATE_ORDER({ dispatch, commit }, payload) {
      try {
        await api.createOrder({ ...payload })
        dispatch('LOAD_ORDERS')
        commit(Types.SET_CART, [])
      } catch (e) {
        throw new Error(e.message)
      }
    },
  },
  getters: {
    filterProducts(state) {
      const filters = state.categoryFilter
      if (filters === undefined || filters.length === 0) return state.products
      const filteredProducts = state.products.filter(p => filters.includes(p.categoryId))
      return filteredProducts
    },

    paginate(state, getters) {
      return paginationPipe(getters.filterProducts, {
        perPage: state.perPage,
        currentPage: state.currentPage,
      })
    },
    totalItemCountAfterFilter(state, getters) {
      return getters.filterProducts.length
    },
    brandsCount(state) {
      const counts = {}
      state.products.forEach(p => {
        counts[p.brand] = counts[p.brand] + 1 || 1
      })

      return counts
    },

    cartLength(state) {
      return state.cart.length
    },

    totalCartItems(state) {
      return state.cart.reduce((count, curItem) => {
        return count + curItem.quantity
      }, 0)
    },
  },
})

export default store
