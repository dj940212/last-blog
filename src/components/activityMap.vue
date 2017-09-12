<template>
	<div class="map">
		<div class="des">513 contributions in the last year</div>

		<div class="map-inner">
			<div class="block">
				<div class="item" v-for="i in dayNum" @click="calDate(i)"></div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import {formatTime} from '@/common/js/utils'
export default {
	name: 'activityMap',
	mounted() {
		this.calDayNum()
		this.getActivity()
	},
	data() {
		return {
			dayNum: 364,
			activity:[]
		}
	},
	methods: {
		calDayNum() {
			let day = new Date().getDay()
			this.dayNum = day + 364
		},
		async getActivity() {
			let res = await axios.get('http://localhost:3000/api/activity/all',{params:{
				limit: this.dayNum
			}})
			this.activity = res.data.data
		},
		async calDate(index) {
			let indexTime = new Date().getTime() - (this.dayNum - index)*24*60*60*1000
			let indexDate = new Date(indexTime)
			let dateStr = `${indexDate.getFullYear()}-${indexDate.getMonth()+1}-${indexDate.getDate()}`
			console.log(dateStr)
		}
	}
}
</script>
<style lang="less">
	@import '../common/less/variable.less';
	.map {
		.map-inner {
			width: 975px;
			height: 170px;
			border: 1px solid @border-color;
			border-radius: 3px;
			margin: 0 auto;
			display: flex;
			.month {
				width: 901px;
				height: 17px;
				.month-item {

				}
			}
			.block {
				display: flex;
				flex-direction: column;
				height: 119px;
				width: 901px;
				// border: 1px solid @border-color;
				margin: 0 auto;
				flex-wrap: wrap;
				.item {
					height: 17px;
					width: 17px;
					box-sizing: border-box;
					background-color: #ebedf0;
					border-right: 2px solid #fff;
					border-bottom: 2px solid #fff;
					cursor: pointer;
				}
			}
		}
		
	}
	
</style>