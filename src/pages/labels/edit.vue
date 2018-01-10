<template>
	<div v-if="show" class="edit">
        <v-input
            v-model="name"
            width="400px"
            :placeholder="type==='create' ? 'New label name': '' ">
        </v-input>
        <div class="changeColor">
            <v-button :background="color" icon="iconfont icon-yansexuanze"></v-button>
            <v-input v-model="color" width="180px"></v-input>
        </div>

        <div class="right">
            <v-button
                background="#f7f9fb"
                border="1px solid rgba(27,31,35,0.2)"
                @click.native="$emit('hidden')"
            >Cancel</v-button>
            <v-button
                border="1px solid rgba(27,31,35,0.2)"
                @click.native = "clickHandle"
            >{{type==="change" ? "Save change" : "Create label"}}</v-button>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
import vButton from '@/components/vButton'
import vInput from '@/components/vInput'
import config from '@/config'
import axios from 'axios'
export default {
	mounted() {
		if(this.type ==="change") {
			console.log("change",this.label)
			this.color = this.label.color,
			this.name = this.label.name
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
        type: {
            type: String,
            default: "change"
        },
		label: {
			type: Object,
			default: () => {}
		},
	},
    data() {
        return {
            color: "",
            name: "",
			colorCode: ""
        }
    },
	components: {
		vButton,
		vInput,
	},
	methods: {
		...mapMutations({
            'setLabels': 'SET_LABELS',
			'setCurEdit': 'SET_CUR_EDIT'
        }),
		clickHandle() {
			if (this.type === "create") {
				return this.newLabel()
			}
			this.changeLabel()
		},
		async newLabel() {
            if (!this.token) return alert("请登录!")
			const res = await axios({
                method: "POST",
                url: config.api.newLabelUrl,
                data: {color: this.color, name: this.name},
                headers: {'x-access-token': this.token},
            })
			console.log(res.data);
			if (res.data.success) {
				const newLabels = this.labels.slice()
				newLabels.unshift(res.data.data)
				this.setCurEdit(-1)
				this.setLabels(newLabels)
                console.log("newLabels",this.labels)
			}
		},
		async changeLabel() {
            if (!this.token) return alert("请登录!")
			const res = await axios({
                method: "POST",
                url: config.api.changeLabelUrl,
                data: {_id: this.label._id, color: this.color, name: this.name},
                headers: {'x-access-token': this.token},
            })

			if (res.data.success) {
				const newLabels = this.labels.slice()
				newLabels.splice(this.curEdit, 1, res.data.data)
				this.setLabels(newLabels)
				this.setCurEdit(-1)
			}
		},
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
	.edit {
		padding: 8px 10px;
        font-size: 12px;
        position: relative;
        border: 1px solid #eaecef;
        .changeColor {
            display: inline-block;
            margin-left: 30px;
            .icon-yansexuanze {
                font-size: 18px !important;
            }
        }
        .right{
            float: right;
            .v-button {
                margin-left: 5px;
            }
        }
        .el-color-picker {
        	position: absolute !important;
        	top: 7px;
        	left: 450px;
        	opacity: 0;
        	cursor: pointer;
        	.el-color-picker__trigger {
        		padding: 0 !important;
        		margin: 0 !important;
        	}
        }
    }
</style>
