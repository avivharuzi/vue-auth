<template>
  <header>
    <ul>
      <li><router-link to="/">HOME</router-link></li>
      <li><router-link to="/about">ABOUT</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/login">LOGIN</router-link></li>
      <li v-if="isLoggedIn"><a @click="logout">LOGOUT</a></li>
    </ul>
  </header>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '@/store/types'

  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.auth.isLoggedIn
      })
    },
    methods: {
      ...mapMutations({
        logout: types.LOGOUT
      })
    }
  }
</script>
