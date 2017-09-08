<template lang="html">
    <div class="overview">
        <div class="popular">
            <p>Popular articles</p>
            <!-- <ul >
                <li class="article" v-for="article in articleList">
                    <h5 class="title">{{article.title}}</h5>
                    <div class="description">{{article.description}}</div>
                    <span class="babel">{{article.babel[1]}}</span>
                    <span class="watch"></span>
                </li>
            </ul> -->
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
        // this.getList()
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
            h4 {
                font-weight: 500;
            }
            ul {
                // display: flex;
                flex-direction: column;
                width: @content-width;
                flex-wrap: wrap;
                padding: 0;
                li.article {
                    list-style: none;
                    width: 310px;
                    border: 1px solid @border-color;
                    border-radius: 3px;
                    float: left;
                    margin: 10px 10px;
                }
            }
        }
    }
</style>
