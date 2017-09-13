<template>
	<div class="map">
		<div class="des">513 contributions in the last year</div>

		<div class="map-inner">
			<div class="block-box">
				<div class="block">
					<div class="item" ref="item" v-for="i in dayNum" @click="calDate(i)"></div>
				</div>
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
		this.getActivity()
	},
	created() {
		this.calDayNum()
		
	},
	data() {
		return {
			dayNum: 364,
			activity:[{date:'2017-9-13'}],
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
			console.log(res.data.data)
			this.activity =res.data.data
			this.colorful(this.activity)
		},
		calDate(index) {
			let indexTime = new Date().getTime() - (this.dayNum - index)*24*60*60*1000
			let indexDate = new Date(indexTime)
			let dateStr = formatTime(indexDate)
			
			return dateStr
		},
		colorful(data) {
			for (let i = 0; i < this.$refs.item.length; i++) {
				const date = this.calDate(i+1)
				for (let j = 0; j < data.length; j++) {
					if (data[j].date === date) {
						const logLen = data[j].log.length
						const elem = this.$refs.item[i]
						if (logLen >= 1 && logLen <3) {
							elem.style.backgroundColor = "#c6e48b"
						}else if(logLen >= 3 && logLen < 5) {
							elem.style.backgroundColor = "#7bc96f"
						}else if (logLen >= 5 && logLen < 7) {
							elem.style.backgroundColor = "#239a3b"
						}else if (logLen >= 7) {
							elem.style.backgroundColor = "#196127"
						}
						
					}
				}
			}
		}
	},
}
</script>
<style lang="less">
	@import '../common/less/variable.less';
	.map {
		margin-bottom: 30px;
		.map-inner {
			width: @content-width;
			height: 170px;
			border: 1px solid @border-color;
			border-radius: 3px;
			margin: 0 auto;
			margin-top: 10px;
			
			.block-box {
				// display: flex;
				margin-top: 25px;
				.block {
					display: flex;
					flex-direction: column;
					height: 119px;
					width: 901px;
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
					.active {
						background-color: green;
					}
				}
			}
		}
	}
	
</style>