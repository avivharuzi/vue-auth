import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/services/http'
import router from '@/router/index'

import {
  LOGIN_URL,
  CHECK_TOKEN_URL
} from '@/constants/urls'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user_token'),
    isLoggedIn: false,
    userData: null
  },
  mutations: {
    setToken: (state, newToken) => {
      state.token = newToken
      localStorage.setItem('user_token', newToken)
    },
    setUserData: (state, userData) => {
      state.userData = userData
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.token = null
      state.isLoggedIn = false
      state.userData = null
      localStorage.removeItem('user_token')
      router.push('/')
    }
  },
  actions: {
    login: (context, user) => {
      return new Promise((resolve, reject) => {
        http.post(LOGIN_URL, user).then(res => {
            let data = res.data.data;
            if (data) {
              context.commit('setToken', date.token)
              context.commit('setUserData', date.userData)
              context.commit('setIsLoggedIn')
              router.push('/')
              resolve(true)
            } else {
              reject(false)
            }
          })
          .catch(err => reject(err))
      })
    },
    checkToken: (context, existToken) => {
      let token
      if (existToken) {
        token = {
          token: existToken
        }
      } else {
        token = {
          token: context.state.token
        }
      }
      return new Promise((resolve, reject) => {
        http.post(CHECK_TOKEN_URL, token).then(res => {
            if (!context.state.userData) {
              context.commit('setUserData', res.data.data)
            }
            resolve(res.data.data)
          })
          .catch(err => reject(err))
      })
    },
    checkUserAfterRefresh: (context) => {
      if (context.state.token) {
        context.dispatch('checkToken')
          .then(res => context.commit('setIsLoggedIn'))
          .catch(err => context.commit('logout'))
      }
    }
  }
})
