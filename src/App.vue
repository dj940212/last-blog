<template>
  <div id="app">
    <myheader></myheader>
    <router-view></router-view>
  </div>
</template>

<script>
import myheader from './components/myheader'
export default {
  name: 'app',
  components: {myheader},
  mounted() {

  },
  methods: {
    async getList() {
      const res = await axios.get('http://localhost:3000/api/article/list',{
          params:{count: 6}
      })
      this.popularArticle = res.data.data
      // this.setArticleList(res.data.data)
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
