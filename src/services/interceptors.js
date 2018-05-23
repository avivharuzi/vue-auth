import http from '@/services/http'
import store from '@/store'
import * as types from '@/store/types'

export default function interceptors() {
  http.interceptors.request.use(config => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }, err => Promise.reject(err))

  http.interceptors.response.use(undefined, err => {
    if (err.status === 401) {
      store.commit(types.LOGOUT)
    }
  })
}
