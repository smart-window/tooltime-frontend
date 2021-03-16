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
    avatar: '',
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
          alert('You have successfully logged in')
        }

        if (!success) {
          commit('SET_STATE', { loading: false })
        }
      })
    },

    LOAD_CURRENT_ACCOUNT({ commit }) {
      commit('SET_STATE', { loading: true })

      auth.currentAccount().then(response => {
        if (response) {
          const { id, email, name, avatar, role } = response
          commit('SET_STATE', { id, name, email, avatar, role, authorized: true })
        }

        commit('SET_STATE', { loading: false })
      })
    },

    LOGOUT({ commit }) {
      console.log('store user/LOGOUT')
      auth.logout(() => {
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
  },

  getters: {
    user: state => state,
  },
}
