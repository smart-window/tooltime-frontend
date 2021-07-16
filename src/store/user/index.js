import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import * as auth from '@/services/auth'
// import VueRouter from 'vue-router'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    email: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    stripeId: '',
    priceId: '',
    subscriptionId: '',
    authorized: process.env.VUE_APP_AUTHENTICATED || false,
    loading: false,
  },

  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, { ...payload })
    },
  },

  actions: {
    LOGIN({ commit, dispatch }, { payload }) {
      const { email, password } = payload
      commit('SET_STATE', { loading: true })

      auth.login(email, password).then(success => {
        if (success) {
          dispatch('LOAD_CURRENT_ACCOUNT')
        }

        if (!success) {
          commit('SET_STATE', { loading: false })
        }
      })
    },

    LOAD_CURRENT_ACCOUNT({ commit, dispatch }) {
      commit('SET_STATE', { loading: true })

      auth
        .currentAccount()
        .then(response => {
          if (response) {
            commit('SET_STATE', { ...response, authorized: true })
            dispatch('LOAD_PRODUCTS', {}, { root: true })
            dispatch('LOAD_CATEGORIES', {}, { root: true })
            dispatch('LOAD_SERVICE_AREAS', {}, { root: true })
            dispatch('LOAD_LOCATIONS', {}, { root: true })
            dispatch('LOAD_ORDERS', {}, { root: true })
          }

          commit('SET_STATE', { loading: false })
        })
        .catch(() => {
          commit('SET_STATE', {
            id: '',
            name: '',
            role: '',
            email: '',
            address: '',
            city: '',
            state: '',
            phone: '',
            stripeId: '',
            priceId: '',
            subscriptionId: '',
            authorized: false,
            loading: false,
          })

          router.push('/auth/login')
        })
    },

    LOGOUT({ commit }) {
      auth.logout().then(() => {
        commit('SET_STATE', {
          id: '',
          name: '',
          role: '',
          email: '',
          address: '',
          city: '',
          state: '',
          phone: '',
          stripeId: '',
          priceId: '',
          subscriptionId: '',
          authorized: false,
          loading: false,
        })

        router.push('/auth/login')
      })
    },

    REGISTER({ commit }, request) {
      commit('SET_STATE', { loading: true })
      auth
        .register(request)
        .then(() => {
          commit('SET_STATE', { loading: false })
        })
        .catch(err => {
          throw new Error(err.message)
        })
    },
  },

  getters: {
    user: state => state,
  },
}
