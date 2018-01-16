<template>
    <div class="label-menu">
        <div class="label">
            <v-button @click.native="getAll" fontSize="13px" background="#eee"> All {{allArticles.length}}</v-button>
        </div>
        <div class="label" v-for="(label,index) in labels">
            <v-button
                @click.native="getLabelArts(index)"
                :background="label.color"
                icon="iconfont icon-biaoqian"
                fontSize="13px"
            >{{label.name}} <span class="artCount">{{label.article.length}}</span></v-button>
        </div>
    </div>
</template>

<script>
import vButton from './vButton'
import {mapMutations, mapGetters} from 'vuex'
import axios from 'axios'
import config from '@/config'
export default {
    props: ['artLength'],
    mounted() {
        this.getLabels()
    },
    computed: {
        ...mapGetters([
            'labels',
            'articleList',
            'allArticles'
        ])
    },
    methods: {
        ...mapMutations({
            setLabels: 'SET_LABELS',
            setArticleList: 'SET_ARTICLE_LIST'
        }),
        async getLabels() {
            const res = await axios.get(config.api.getLabelsUrl)
            this.setLabels(res.data.data)
        },
        getLabelArts(index) {
            const label = this.labels[index]
            console.log(label)
            this.setArticleList(label.article)
        },
        getAll() {
            this.setArticleList(this.allArticles)
        }
    },
    components: {
        vButton
    }
}
</script>

<style lang="less">
@import "../common/less/variable.less";
.label-menu {
    width: 100%;
    display: flex;
    padding: 15px 0;
    flex-wrap: wrap;
    .label {
        margin: 4px;
        cursor: pointer;
    }
}
@media screen and (max-width: 800px){
    .label-menu {
        padding: 5px 0;
        justify-content: center;
        .label {
            margin: 2px;
            .v-button button {
                padding: 0 5px;
            }
            i {
                display:none;
            }
        }
    }
    
}
</style>
