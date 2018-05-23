import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import About from '@/pages/About'

// Guards
import { authGuard } from '@/services/guards'

Vue.use(Router)

// Routes
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      },
      beforeEnter: (to, from, next) => authGuard(next)
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'About'
      },
      beforeEnter: (to, from, next) => authGuard(next)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
