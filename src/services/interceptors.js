import http from '@/services/http'
import router from '@/router'
import store from '@/store'

export default function interceptors() {
  http.interceptors.request.use(config => {
    const token = store.state.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, err => Promise.reject(err))

  http.interceptors.response.use(undefined, err => {
    if (err.status === 401) {
      router.push('/')
    }
  })
}
