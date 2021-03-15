import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router'
// import * as auth from '@/services/auth'

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
    //LOGIN({ commit, dispatch, rootState }, { payload }) {},
  },
}
