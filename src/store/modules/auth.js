import http from '@/services/http'
import router from '@/router/index'

import * as types from '@/store/types'

import { LOGIN_URL, CHECK_TOKEN_URL } from '@/constants/urls'

const state = {
  token: localStorage.getItem('user_token'),
  isLoggedIn: false,
  userData: null
}

const mutations = {
  [types.SET_TOKEN]: (state, newToken) => {
    state.token = newToken
    localStorage.setItem('user_token', newToken)
  },
  [types.SET_IS_LOGGED_IN]: state => {
    state.isLoggedIn = true
  },
  [types.SET_USER_DATA]: (state, userData) => {
    state.userData = userData
  },
  [types.LOGOUT]: state => {
    state.token = null
    state.isLoggedIn = false
    state.userData = null
    localStorage.removeItem('user_token')
    router.push('/')
  }
}

const actions = {
  [types.LOGIN]: (context, user) => {
    return new Promise((resolve, reject) => {
      http.post(LOGIN_URL, user).then(res => {
          let data = res.data.data;
          if (data) {
            context.commit(types.SET_TOKEN, date.token)
            context.commit(types.SET_IS_LOGGED_IN)
            context.commit(types.SET_USER_DATA, date.userData)
            router.push('/')
            resolve(true)
          } else {
            reject(false)
          }
        })
        .catch(err => reject(err))
    })
  },
  [types.CHECK_TOKEN]: (context, existToken) => {
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
            context.commit(types.SET_USER_DATA, res.data.data)
          }
          resolve(res.data.data)
        })
        .catch(err => reject(err))
    })
  },
  [types.CHECK_USER_AFTER_REFRESH]: context => {
    if (context.state.token) {
      context.dispatch(types.CHECK_TOKEN)
        .then(res => context.commit(types.SET_IS_LOGGED_IN))
        .catch(err => context.commit(types.LOGOUT))
    }
  }
}

export default {
  state,
  mutations,
  actions
}
