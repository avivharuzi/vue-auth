import store from '@/store'
import * as types from '@/store/types'

export function authGuard(next) {
  if (store.state.auth.token) {
    store.dispatch(types.CHECK_TOKEN)
      .then(res => next())
      .catch(err => {
        context.commit(types.LOGOUT)
        return next(false)
      })
  } else {
    store.commit(types.LOGOUT)
    return next(false)
  }
}
