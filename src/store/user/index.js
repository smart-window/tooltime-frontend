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
          alert('You have successfully logged in!')
        }

        if (!success) {
          commit('SET_STATE', { loading: false })
        }
      })
    },

    LOAD_CURRENT_ACCOUNT({ commit, dispatch }) {
      commit('SET_STATE', { loading: true })

      auth.currentAccount().then(response => {
        if (response) {
          commit('SET_STATE', { ...response, authorized: true })
          dispatch('LOAD_PRODUCTS', {}, { root: true })
          dispatch('LOAD_CATEGORIES', {}, { root: true })
        }

        commit('SET_STATE', { loading: false })
      })
    },

    LOGOUT({ commit }) {
      auth.logout().then(() => {
        commit('SET_STATE', {
          id: '',
          name: '',
          role: '',
          email: '',
          avatar: '',
          authorized: false,
          loading: false,
        })

        router.push('/auth/login')
      })
    },

    REGISTER({ commit, dispatch }, request) {
      commit('SET_STATE', { loading: true })
      auth
        .register(request)
        .then(success => {
          if (success) {
            this.$swal('Hello')
            dispatch('LOAD_CURRENT_ACCOUNT')
          } else {
            alert('Register Failed')
            commit('SET_STATE', { loading: false })
          }
        })
        .catch(err => {
          alert('Register Failed', err.message)
        })
    },
  },

  getters: {
    user: state => state,
  },
}
