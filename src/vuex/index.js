import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    getUserInfo (state) {
      let allKey = Object.keys(state.userInfo)
      if (allKey.length > 0) {
        return state.userInfo
      } else {
        let userInfo = window.localStorage.getItem('user')
        console.log(userInfo, JSON.parse(userInfo))
        if (userInfo) {
          return JSON.parse(userInfo)
        }
      }
      return {}
    }
  },
  mutations: {
    setUserInfo (state, user) {
      state.userInfo = user
    }
  },
  actions: {
    setUserInfo ({commit}, user) {
      window.localStorage.setItem('user', JSON.stringify(user))
      // window.localStorage.user = JSON.stringify(user)
      commit('setUserInfo', user)
    }
  }
})
