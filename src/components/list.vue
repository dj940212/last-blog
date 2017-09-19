<template>
    <div class="articleList" ref="articleList" @scroll="scrollHandle">
        <ul class="articleUl">
            <li v-for="(article, index) in articleList">
                <h5 @click="toReadArticle(index)">{{article.title}}</h5>
                <p class="desc">{{article.description}}</p>
                <div class="footer">
                    <Babel v-for="babel in article.babel" :title="babel" :color="getColor"></Babel>
                    <span class="createTime">{{article.meta.createAt}}</span>
                </div>
            </li>
        </ul>
        <div class="loading">Loading...</div>
    </div>
</template>
<script>
import axios from 'axios'
import Babel from '@/common/vue/babel'
import {mapGetters, mapMutations} from 'vuex'
import api from '@/config/api'
export default {
    mounted(){
        if (!this.articleList.length) {
            this.getList()
        }
    },
    data() {
        return {
            babelColor: ["#e99695","#f9d0c4","#fef2c0","#c2e0c6","#bfdadc","#c5def5","#bfd4f2","#d4c5f9"]
        }
    },
    components: {
        Babel
    },
    computed: {
        ...mapGetters([
            'articleList',
        ]),
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
          const res = await axios.get(api.articleListUrl)
          this.setArticleList(res.data.data)
          console.log("文章列表",res.data.data)
        },
        toReadArticle(index) {
            this.setArticleMode('read')
            this.setCurrentIndex(index)
            this.setArticleId(this.articleList[index]._id)
            this.$router.push({ name: 'article', params: { _id: this.articleList[index]._id}})

            console.log(index,this.articleList[index]._id)
        },
        scrollHandle(event) {
            console.log("scrilll",event)
        }
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
        .loading {
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
    }
</style>
