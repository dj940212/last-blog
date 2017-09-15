<template>
    <div class="articleList">
        <ul>
            <li v-for="(article, index) in articleList">
                <h5 @click="toReadArticle(index)">{{article.title}}</h5>
                <p class="desc">{{article.description}}</p>
                <div class="footer">
                    <Babel v-for="babel in article.babel" :title="babel" :color="getColor"></Babel>
                    <span class="createTime">{{article.meta.createAt}}</span>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import Babel from '@/common/vue/babel'
import {mapMutations} from 'vuex'
export default {
    mounted(){
        this.getList()
    },
    data() {
        return {
            articleList: [],
            babelColor: ["#e99695","#f9d0c4","#fef2c0","#c2e0c6","#bfdadc","#c5def5","#bfd4f2","#d4c5f9"]
        }
    },
    components: {
        Babel
    },
    computed: {
        getColor() {
            let index = Math.round(Math.random()*7)
            return this.babelColor[index]
        }
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setArticleId: 'SET_ARTICLE_ID'
        }),
        async getList() {
            const res = await axios.get('http://localhost:3000/api/article/list')
            this.articleList = res.data.data
            this.setArticleList(res.data.data)
            console.log(this.articleList)
        },
        toReadArticle(index) {
            this.setArticleMode('read')
            console.log(index,this.articleList[index]._id)
            this.setCurrentIndex(index)
            this.setArticleId(this.articleList[index]._id)
            this.$router.push({ name: 'article', params: { _id: this.articleList[index]._id}})
        },

    }
}
</script>

<style lang="less">
    @import '../common/less/variable.less';
    .articleList {
        width: @content-width;
        margin: 0 auto;
        ul {
            padding-left: 0px;
            li {
                list-style: none;
                border-bottom: 1px solid @border-color;
                padding: 20px 0;
                padding-right: 30%;
                h5 {
                    font-weight: 600;
                    cursor: pointer;
                    color: @title-color;
                }
                .desc {
                    font-size: 13px;
                    color: @desc-color;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #222;
                    .createTime{
                        margin-left: 10px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
