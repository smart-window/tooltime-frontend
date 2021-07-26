import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import * as auth from '@/services/auth'

Vue.use(Vuex)

const INIT_STATE = {
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
  status: '',
  authorized: false,
  loading: false,
}

export default {
  namespaced: true,
  state: INIT_STATE,

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
          commit('SET_STATE', { authorized: true })
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
          commit('SET_STATE', INIT_STATE)

          if (router.options.routes[2].path != '/auth') {
            router.push('/auth/login')
          }
        })
    },

    LOGOUT({ commit }) {
      auth.logout().then(() => {
        commit('SET_STATE', INIT_STATE)

        router.push('/auth/login')
      })
    },

    REGISTER({ commit }, request) {
      commit('SET_STATE', { loading: true })
      auth
        .register(request)
        .then((response) => {
          response.status = null
          commit('SET_STATE', { tmp_email: response.email, loading: false })
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
