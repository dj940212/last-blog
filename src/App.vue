<template>
  <div id="app">
    <router-view name="login"></router-view>
    <div>
      <myheader></myheader>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import myheader from './components/myheader'
import api from '@/config/api'
import {mapGetters, mapMutations} from 'vuex'
import axios from 'axios'
export default {
  name: 'app',
  components: {myheader},
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
