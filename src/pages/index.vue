<template lang="html">
    <div class="overview">
        <div class="popular">
            <p class="name">Rencent Articles</p>
            <div class="article-box">
                <li class="article" v-for="(item, index) in popularArticle">
                    <h5 class="title" @click="toReadArticle(index)">{{item.title}}</h5>
                    <div class="description">{{item.description}}</div>
                    <div class="footer">
                        <div class="labeldot-box" v-show="item.label.length">
                            <label-dot
                                v-for="label in item.label"
                                :key="label.id"
                                :title="label.name"
                                :color="label.color">
                            </label-dot>
                        </div>
                        <span class="updateAt">Updated {{getTimeBetween(item.meta.updateAt)}}</span>
                    </div>
                </li>
            </div>
            <activityMap></activityMap>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import activityMap from '@/components/activityMap'
import labelDot from '@/components/labelDot'
import { fromNow } from '@/common/js/utils'
import {formatTimeAll} from '@/common/js/utils'
import config from '@/config'
export default {
    mounted() {
        this.getList()
    },
    data() {
        return {
            popularArticle: [],
        }
    },
    computed: {
        ...mapGetters([
            'articleList',
            'mode',
            'currentIndex'
        ])
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setArticleId: 'SET_ARTICLE_ID'
        }),
        toReadArticle(index) {
            this.setArticleMode('read')
            this.setCurrentIndex(index)
            this.setArticleId(this.popularArticle[index]._id)
            const _id = this.popularArticle[index]._id
            this.$router.push({path: `/article/${_id}`})

            console.log(index,this._id)
        },
        async getList() {
          const res = await axios.get(config.api.articleListUrl,{params: {count: 6}})
          this.popularArticle = res.data.data
          console.log("热门文章",res.data.data)
        },
        getTimeBetween(date) {
           return  fromNow(date)
        }
    },
    components: {
        activityMap,
        labelDot
    }
}
</script>

<style lang="less" scoped>
    @import '../common/less/variable.less';
    .overview {
        max-width: @content-width;
        margin: 0 auto;
        .popular {
            .name{
                font-size: 16px;
                padding-top: 20px;
                margin: 0;
                font-weight: 400;
                color: #333;
                @media screen and (max-width: 800px) {
                    margin:5px 5px;
                    padding-top: 10px;
                }
            }
            .article-box {
                display: flex;
                flex-direction: row;
                max-width: @content-width;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 0;
                li.article {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    list-style: none;
                    width: 480px;
                    border: 1px solid @border-color;
                    border-radius: 3px;
                    margin: 10px 0;
                    padding: 16px;
                    @media screen and (max-width: 800px) {
                        margin:5px 5px;
                    }
                    h5 {
                        font-weight: 600;
                        cursor: pointer;
                        color: @title-color;
                        font-size: 16px;
                    }
                    .description {
                        font-size: 12px;
                        color: @desc-color;
                        margin-top: 5px;
                        margin-bottom: 12px;
                    }
                    .footer {
                        font-size: 12px;
                        color: #222;
                        .labeldot-box {
                            display: inline-block;
                            margin-right: 15px;
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
            .map {
                @media screen and (max-width: 800px) {
                    display: none;
                }
            }
        }
    }
</style>
