<template>
	<div class="card">
		<div class="item-filter">
			<v-input height="30px" width="92%"></v-input>
		</div>
		<ul class="item-list">
			<ul>
				<li class="item" v-for="(item,index) in labels" @click="clickHandle(index)">
					<i class="el-icon-check" :style="iconStyle(item)"></i>
					<div class="label">
						<div class="color-box" :style="{background: item.color}"></div>
						<span class="label-name">{{item.name}}</span>
					</div>
					<i class="el-icon-close" :style="iconStyle(item)"></i>
				</li>
			</ul>
		</ul>
	</div>
</template>
<script type="text/javascript">
import {mapGetters, mapMutations} from 'vuex'
import vInput from './vInput'
import axios from 'axios'
import config from '@/config'
export default {
	props: ['article'],
	mounted() {
	},
	data() {
		return {
			selectIdx: -1,
			// iconStyle: {color:}
		}
	},
	components: {
		vInput
	},
	computed: {
        ...mapGetters([
            'labels',
            'token'
        ])
    },
	methods: {
		...mapMutations({
            setLabels: 'SET_LABELS'
        }),
		clickHandle(index) {
			if (this.labels[index].selected) {
				return this.delLabel(index)
			}
			this.addLabel(index)
		},
		async addLabel(index) {
			if (!this.token) return alert("请登录!")
			const res = await axios({
				url: config.api.addLabelUrl,
				method: 'POST',
				data: {article_id: this.article._id, label_id: this.labels[index]._id},
				headers: {'x-access-token': this.token},
			})
			const newLabels = this.labels.slice()
			newLabels[index].selected = true
			this.setLabels(newLabels)
		},
		async delLabel(index) {
			if (!this.token) return alert("请登录!")
			const res = await axios({
				url: config.api.delLabelUrl,
				method: 'POST',
				data: {article_id: this.article._id, label_id: this.labels[index]._id},
				headers: {'x-access-token': this.token},
			})
			const newLabels = this.labels.slice()
			newLabels[index].selected = false
			this.setLabels(newLabels)
		},
		iconStyle(item) {
			if (item.selected) {
				return {color: item.color}
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../common/less/variable.less";
.card {
	width: 300px;
	border: 1px solid @border-color;
	.item-filter {
		width: 100%;
		padding: 10px;
		border-bottom: 1px solid @border-color;
		background-color: #f6f8fa;
		.v-input {
			width: 100%;
		}
	}
	.item-list {
		background: #fff;
		width: 100%;
		max-height: 400px;
		overflow: auto;
		li.item{
			height: 35px;
			list-style: none;
			padding:0 15px;
			line-height: 34px;
			border-bottom: 1px solid @border-color;
			&:hover {
				background: #f4f4f5;
			}
			i {
				font-size: 12px;
				font-weight: 800;
				color: rgba(0,0,0,0);
			}
			i.el-icon-close {
				cursor: pointer;
			}
			.label {
				display: inline-block;
				cursor: pointer;
				width: 220px;
				.color-box {
					display: inline-block;
					height: 14px;
					width: 14px;
					margin-left: 10px;
					line-height: 34px;
					vertical-align: middle;
					border-radius: 2px;
				}
				.label-name {
					line-height: 34px;
					margin-left: 10px;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
