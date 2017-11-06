<template>
	<div class="item" v-if="curEdit !== index">
        <div class="normal">
            <v-button 
                :background="label.color" 
                icon="iconfont icon-biaoqian"
                >{{label.name}}
            </v-button>
            <div class="babel-action">
                <span class="count">{{label.article.length}} blogs</span>
                <v-button
                    background="#fff"
                    fontSize="14px"
                    icon="iconfont icon-bianji-copy-copy"
                    @click.native = "$emit('click')"
                ></v-button>
                <v-button
                    background="#fff"
                    fontSize="14px"
                    icon="iconfont icon-cross"
                    @click.native="delLabel"
                ></v-button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import {mapMutations, mapGetters} from 'vuex'
import vButton from '@/components/vButton'
import axios from 'axios'
import config from '@/config'
export default {
    mounted() {
        console.log(this.label)
    },
	props: ['index', 'label'],
	components: {
		vButton,
	},
    methods: {
        ...mapMutations({
            'setLabels': 'SET_LABELS'
        }),
        async delLabel() {
            if (!this.token) return alert("请登录!")
            const res = await axios({
                url: config.api.deleteLabelUrl,
                method: 'POST',
                data: {_id: this.label._id},
                headers: {'x-access-token': this.token},
            })
            if (res.data.success === true) {
				const newLabels = this.labels.slice()
	            newLabels.splice(this.index, 1)
	            this.setLabels(newLabels)
            }
        }
    },
    computed: {
        ...mapGetters([
            'labels',
			'curEdit',
            'token'
        ])
    }
}
</script>
<style lang="less" scoped>
.item {
    padding: 8px 10px;
    font-size: 12px;
    border-left: 1px solid #eaecef;
    border-right: 1px solid #eaecef;
    border-bottom: 1px solid #eaecef;
    .normal {
        .babel-action {
            float: right;
            .count {
                margin-right: 80px;
                font-size: 14px;
            }
            .v-button {
                button {
                    background: #fff !important;
                }
            }
            
        }
    }
}
@media screen and (max-width: 800px) {
    .item {
        .normal {
            .babel-action {
                .count {
                    margin-right: 10px;
                }
                .v-button {
                    button {
                        padding: 0 5px;
                    }
                }
            }
        }
    }
}
</style>
