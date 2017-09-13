<template lang="html">
    <div class="overview">
        <div class="popular">
            <p>Popular articles</p>
            <div class="article-box">
                <li class="article" v-for="(item, index) in popularArticle">
                    <h5 class="title" @click="toReadArticle(index)">{{item.title}}</h5>
                    <div class="description">{{item.description}}</div>
                    <div class="marker">
                        <span class="babel" v-for="babel in item.babel">{{babel}}</span>
                        <!-- <span class="watch">123</span> -->
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
export default {
    mounted() {
        this.getList()
    },
    created() {

    },
    data() {
        return {
            popularArticle: []
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
        async getList() {
            const res = await axios.get('http://localhost:3000/api/article/list',{
                params:{count: 6}
            })
            this.popularArticle = res.data.data
            // this.setArticleList(res.data.data)
            // console.log(this.articleList)
        },
        toReadArticle(index) {
            this.setArticleMode('read')
            console.log(index,this.popularArticle[index]._id)
            // this.setCurrentIndex(index)
            this.setArticleId(this.popularArticle[index]._id)
            this.$router.push({ name: 'article', params: { _id: this.popularArticle[index]._id}})
        },
    },
    components: {
        activityMap
    }

}
</script>

<style lang="less" scoped>
    @import '../common/less/variable.less';
    .overview {
        width: @content-width;
        margin: 0 auto;
        .popular {
            // width: 900px;
            // margin: 0 auto;
            h4 {
                font-weight: 500;
                padding-left: 10px;
            }
            .article-box {
                display: flex;
                flex-direction: row;
                width-min: @content-width;
                justify-content: space-around;
                flex-wrap: wrap;
                padding: 0;
                li.article {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    list-style: none;
                    width: 470px;
                    border: 1px solid @border-color;
                    border-radius: 3px;
                    margin: 10px 0;
                    padding: 16px;
                    h5 {
                        font-weight: 600;
                        cursor: pointer;
                        color: @title-color;
                        // letter-spacing: 1px;
                    }
                    .description {
                        font-size: 12px;
                        color: @desc-color;
                        margin: 10px 0;
                    }
                    .marker {
                        font-size: 12px;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
