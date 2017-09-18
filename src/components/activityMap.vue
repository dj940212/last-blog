<template>
	<div class="map">
		<div class="des">513 contributions in the last year</div>

		<div class="map-inner">
			<div class="block-box">
				<div class="week">
					<div class="wday">Tue</div>
					<div class="wday">Thu</div>
					<div class="wday">Sat</div>
					<!-- <div class="wday">sun</div> -->
				</div>
				<div class="block">
					<div class="item" ref="item" v-for="i in dayNum" @click="calDate(i)">
						<div class="month" v-if="calTime(i).getDay() === 1 && calTime(i).getDate() >=12 && calTime(i).getDate() <= 18">{{calTime(i).getMonth()+1}}</div>
					</div>
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
			console.log(dateStr)
			
			return dateStr
		},
		calTime(index) {
			let indexTime = new Date().getTime() - (this.dayNum - index)*24*60*60*1000
			let indexDate = new Date(indexTime)

			return indexDate
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
				margin-top: 25px;
				// margin: 0 auto;
				width: 1010px;
				display: flex;
				.week {
					display: flex;
					flex-direction: column;
					.wday {
						font-size: 9px;
						color: #767676;
						line-height: 17px;
						margin-top: 17px;
					}
				}
				.block {
					display: flex;
					flex-direction: column;
					height: 119px;
					width: 901px;
					// margin: 0 auto;
					margin-left: 5px;
					flex-wrap: wrap;
					.item {
						height: 17px;
						width: 17px;
						box-sizing: border-box;
						background-color: #ebedf0;
						border-right: 2px solid #fff;
						border-bottom: 2px solid #fff;
						cursor: pointer;
						.month {
							position: relative;
							top: -19px;
						}
					}
					.active {
						background-color: green;
					}
				}
			}
		}
	}
	
</style>