import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: '',
    messageStatus: 'Info'
  },
  getters: {
    getMessage (state) {
      return state.message
    },
    getMessageStatus (state) {
      return state.messageStatus
    }
  },
  mutations: {
    setMessage (state, payload) {
      state.message = payload
    },
    setMessageStatus (state, payload) {
      state.messageStatus = payload
    }
  },
  actions: {
    setBanner (context, payload) {
      context.commit('setMessage', payload.message)
      context.commit('setMessageStatus', payload.status)
    }
  },
  modules: {
  }
})
