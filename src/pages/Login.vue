<template>
  <main>
    <form @submit.prevent="loginUser">
      <div>
        <input type="text" v-model="email" placeholder="Email">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Password">
      </div>
      <button>Submit</button>
    </form>
  </main>
</template>

<script>
  import { mapActions } from 'vuex'
  import * as types from '@/store/types'

  export default {
    data () {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      ...mapActions({
        login: types.LOGIN
      }),
      loginUser () {
        this.login({
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>
