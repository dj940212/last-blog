<template>
    <div class="articleList">
        <ul v-for="(article, index) in articleList">
            <li @click="toReadArticle(index)">{{article.title}}</li>
            <p>{{article.description}}</p>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
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
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        async getList() {
            const res = await axios.get('http://localhost:3000/api/article/list')
            this.articleList = res.data.data
            this.setArticleList(res.data.data)
            console.log(this.articleList)
        },
        toReadArticle(index) {
            this.setArticleMode('read')
            console.log(index)
            this.setCurrentIndex(index)
            this.$router.push({ name: 'article', params: { _id: this.articleList[index]._id}})
        },

    }
}
</script>

<style>
    
</style>