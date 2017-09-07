<template>
    <div class="articleList">
        <ul v-for="article in articleList">
            <li @click="fullText">{{article.title}}</li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    mounted(){
        this.getList()
    },
    data() {
        return {
            articleList: []
        }
    },
    methods: {
        async getList() {
            const res = await axios.get('http://localhost:3000/api/article/list')
            this.articleList = res.data.data
        },
        fullText(index) {
            // this.articleList[index]
            this.$router.push('article')
        }
    }
}
</script>

<style>
    
</style>