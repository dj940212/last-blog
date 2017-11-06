<template>
    <div id="list" class="articleList" ref="articleList">
        <label-menu :artLength="allArticleCount"></label-menu>
        <ul class="articleUl">
            <li v-for="(article, index) in articleList">
                <h5 @click="toReadArticle(index)">{{article.title}}</h5>
                <p class="desc">{{article.description}}</p>
                <div class="footer">
                    <div class="labeldot-box" v-show="article.label.length">
                        <label-dot
                            v-for="label in article.label"
                            :key="label.id"
                            :title="label.name"
                            :color="label.color">
                        </label-dot>
                    </div>
                    <span class="updateAt">Updated {{getTimeBetween(article.meta.updateAt)}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import labelDot from '@/components/labelDot'
import labelMenu from '@/components/labelMenu'
import { fromNow } from '@/common/js/utils'
import {mapGetters, mapMutations} from 'vuex'
import config from '@/config'
export default {
    mounted(){
        this.getList()
    },
    data() {
        return {
            allArticleCount: 0
        }
    },
    components: {
        labelDot,
        labelMenu
    },
    computed: {
        ...mapGetters([
            'articleList',
            'labels',
        ]),
        
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setArticleId: 'SET_ARTICLE_ID',
            setAllArticles: 'SET_ALL_ARTICLES'
        }),
        async getList() {
            const res = await axios.get(config.api.articleListUrl)
            this.setArticleList(res.data.data)
            this.setAllArticles(res.data.data)
            this.allArticleCount = res.data.data.length
            console.log("文章列表",this.articleList)

            const date = fromNow(this.articleList[0].meta.updateAt)
            console.log(date)
        },
        toReadArticle(index) {
            this.setArticleMode('read')
            this.setCurrentIndex(index)
            this.setArticleId(this.articleList[index]._id)

            const _id = this.articleList[index]._id
            this.$router.push({path: `/article/${_id}`})

            console.log(index,this.articleList[index]._id)
        },
        getTimeBetween(date) {
           return  fromNow(date)
        }
    }
}
</script>

<style lang="less">
@import '../../common/less/variable.less';
.articleList {
    max-width: @content-width;
    margin: 0 auto;
    ul {
        padding-left: 0px;
        li:nth-child(1){
            border-bottom: 1px solid @border-color;
            border-top: 1px solid @border-color;
        }
        li {
            list-style: none;
            border-bottom: 1px solid @border-color;
            padding: 15px 0;
            padding-right: 30%;
            h5 {
                font-weight: 600;
                font-size: 17px;
                cursor: pointer;
                color: @title-color;
            }
            .desc {
                font-size: 14px;
                color: @text-gray;
                margin: 8px 0 17px 0;
            }
            .footer {
                font-size: 12px;
                color: #222;
                .labeldot-box {
                    display: inline-block;
                    margin-right: 20px;
                }
                .updateAt{
                    // margin-left: 10px;
                    font-size: 12px;
                    color: @text-gray;
                    position: relative;
                    top: -2px;
                }
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .articleList {
        ul li {
            margin:0 10px;
            padding: 8px 0;
            padding-right: 0;
            h5 {
                font-size: 16px;
            }
            .desc {
                margin: 5px 0 12px 0;
            }
        }
    }
}
</style>
