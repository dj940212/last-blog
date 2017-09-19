<template>
  <div id="app">
    <myheader></myheader>
    <router-view></router-view>
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
    this.getList()
  },
  methods: {
    ...mapMutations({
      'setArticleList': 'SET_ARTICLE_LIST'
    }),
    async getList() {
      const res = await axios.get(api.articleListUrl)
      this.setArticleList(res.data.data)

      console.log("文章",res.data.data)
    },
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
