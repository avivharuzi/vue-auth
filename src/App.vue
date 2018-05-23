<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import { mapActions } from 'vuex'
  import * as types from '@/store/types'

  export default {
    methods: {
      ...mapActions({
        checkUserAfterRefresh: types.CHECK_USER_AFTER_REFRESH
      })
    },
    created () {
      this.checkUserAfterRefresh()
    },
    components: {
      'app-header': Header
    }
  }
</script>
