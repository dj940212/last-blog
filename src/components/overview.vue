<template lang="html">
    <div class="overview">
        <div class="popular">
            <p>Popular articles</p>
            <ul >
                <li class="article">
                    <h5 class="title">{{articleList[0].title}}</h5>
                    <div class="description">{{articleList[0].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch">123</span>
                    </div>
                </li>
                <li class="article">
                    <h5 class="title">{{articleList[1].title}}</h5>
                    <div class="description">{{articleList[1].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch"></span>
                    </div>
                </li>
                <li class="article">
                    <h5 class="title">{{articleList[2].title}}</h5>
                    <div class="description">{{articleList[2].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch"></span>
                    </div>
                </li>
                <li class="article">
                    <h5 class="title">{{articleList[3].title}}</h5>
                    <div class="description">{{articleList[3].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch"></span>
                    </div>
                </li>
                <li class="article">
                    <h5 class="title">{{articleList[4].title}}</h5>
                    <div class="description">{{articleList[4].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch"></span>
                    </div>
                </li>
                <li class="article">
                    <h5 class="title">{{articleList[5].title}}</h5>
                    <div class="description">{{articleList[5].description}}</div>
                    <div class="marker">
                        <span class="babel">{{articleList[5].babel[1]}}</span>
                        <span class="watch"></span>
                    </div>
                    
                </li>
            </ul>
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
            setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        async getList() {
            const res = await axios.get('http://localhost:3000/api/article/list')
            this.articleList = res.data.data
            this.setArticleList(res.data.data)
            console.log(this.articleList)
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
        .popular {
            // width: 900px;
            // margin: 0 auto;
            h4 {
                font-weight: 500;
                padding-left: 10px;
            }
            ul {
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
