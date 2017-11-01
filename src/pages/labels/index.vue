<template>
    <div class="labels">
        <div class="labels-inner">
            <header class="labels-header">
                <span class="meta">{{labels.length}} labels</span>
                <v-button fontSize="16px" @click.native="setCurEdit(-2)">New label</v-button>
            </header>
            <edit type="create" :show="curEdit === -2" @hidden="setCurEdit(-1)"></edit>
            <ul class="label-list">
                <li class="label-item" v-for="(item, index) in labels">
                    <item
                        @click="setCurEdit(index)"
                        :index="index"
                        :label="item">
                    </item>
                    <edit :index="index" :label="item" :show="curEdit===index" @hidden="setCurEdit(-1)"></edit>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapMutations, mapGetters} from 'vuex'
    import vButton from '@/components/vButton'
    import vInput from '@/components/vInput'
    import edit from './edit'
    import item from './item'
    import config from '@/config'
    import axios from 'axios'
    export default {
        mounted() {
            this.getLabels()
        },
        data() {
            return {
                editShow: false,
                currentEdit: -1,
            }
        },
        methods: {
            ...mapMutations({
                setIsLogin: 'SET_IS_LOGIN',
                setLabels: 'SET_LABELS',
                setCurEdit: 'SET_CUR_EDIT'
            }),
            async getLabels() {
                const res = await axios.get(config.api.getLabelsUrl)
                this.setLabels(res.data.data)
                console.log("list", this.labels)
            }
        },
        components: {
            vButton,
            vInput,
            edit,
            item
        },
        computed: {
            ...mapGetters([
                'labels',
                'curEdit'
            ])
        }
    }
</script>
<style lang="less" scoped>
    @import '../../common/less/variable.less';
    .labels {
        .labels-inner {
            width: @content-width;
            margin: 0 auto;
            margin-top: 20px;
            .labels-header {
                height: 52px;
                background-color: #f6f8fa;
                border: 1px solid @border-color;
                padding-left: 16px;
                border-radius: 3px 3px 0 0;
                .meta {
                    display: inline-block;
                    padding-top: 13px;
                    padding-bottom: 13px;
                    line-height: 26px;
                    color: #586069;
                }
                .v-button {
                    float: right;
                    margin-top: 8px;
                    margin-right: 16px;
                    button{
                        background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
                    }
                }
            }
            .label-list {
                .label-item {
                    list-style: none;
                }

            }
        }
    }
</style>
