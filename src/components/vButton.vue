<template>
	<div class="v-button">
		<button :style="{background, border, fontSize, color}">
			<i :class="icon"></i>
			<slot></slot>
		</button>
	</div>
</template>
<script>
import {colorNum} from '@/common/js/utils'
export default {
	mounted() {
		this.changeColor()
	},
	updated() {
		this.changeColor()
	},
	data() {
		return {
			color: "#fff"
		}
	},
	methods: {
		changeColor() {
			const num = colorNum(this.background)
			if (num > 8388607) {
				this.color = "#333026"
			}
		}
	},
	props: {
		background: {
			type: String,
			default: '#66c656'
		},
		width: {
			type: String,
			default: '150px'
		},
		height: {
			type: String,
			default: '50px'
		},
		border: {
			type: String,
			default: '1px solid transparent'
		},
		icon: {
			type: String,
			default: ''
		},
		fontSize: {
			type: String,
			default: '16px'
		},
	},
}
</script>
<style lang="less" scoped>
	.v-button {
		display: inline-block;
		button {
            background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
            border: 1px solid transparent;
            // box-shadow: inset 0 -1px 0 rgba(27,31,35,0.12);
            // color: #fff;
            padding: 0 10px;
            font-weight: 600px !important;
            border-radius: 3px;
            line-height: 2;
            cursor: pointer;
            i {
            	padding-right: 5px;
				font-size: 15px;
            }
		}
	}
</style>
