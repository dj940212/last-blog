<template>
  <div id="app">
    <router-view name="login"></router-view>
    <div>
      <v-header></v-header>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import vHeader from '@/components/vHeader'
import config from '@/config'
import axios from 'axios'
export default {
  components: {vHeader},
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
