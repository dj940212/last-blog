<template>
	<div class="map">
		<div class="title">{{this.activityNum}} contributions in the last year</div>
		<div class="map-inner clearfix">
			<div class="block-box">
				<div class="week">
					<div class="wday">Tue</div>
					<div class="wday">Thu</div>
					<div class="wday">Sat</div>
					<!-- <div class="wday">sun</div> -->
				</div>
				<div class="block">
					<div class="item" ref="item" v-for="i in dayNum" @click="calDate(i)">
						<div class="month" v-if="calTime(i).getDay() === 1 && calTime(i).getDate() >=12 && calTime(i).getDate() <= 18">{{calMonth(i)}}</div>
					</div>
					
				</div>
			</div>
			<div class="legend">
				<div class="less">Less</div>
				<div class="item-box">
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
				</div>
				<div class="more">More</div>
			</div>
			<div class="allLog"><a href="">show all contributions</a></div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import {formatTime, monthStr} from '@/common/js/utils'
import api from '@/config/api'
export default {
	name: 'activityMap',
	mounted() {
		this.getActivity()
		console.log(this.calMonth(1))
	},
	created() {
		this.calDayNum()
		
	},
	data() {
		return {
			dayNum: 364,
			activity:[],
			activityNum: 0
		}
	},
	methods: {
		calDayNum() {
			let day = new Date().getDay()
			this.dayNum = day + 364
		},
		async getActivity() {
			let res = await axios.get(api.getAllActivityUrl,{params:{
				limit: this.dayNum
			}})
			console.log(res.data.data)
			this.activity =res.data.data
			this.activity.forEach((item, index)=>{
				console.log(item)
				this.activityNum += item.log.length
			})

			this.colorful(this.activity)
		},
		calDate(index) {
			let indexTime = new Date().getTime() - (this.dayNum - index)*24*60*60*1000
			let indexDate = new Date(indexTime)
			let dateStr = formatTime(indexDate)
			// console.log(dateStr)
			
			return dateStr
		},
		calTime(index) {
			let indexTime = new Date().getTime() - (this.dayNum - index)*24*60*60*1000
			let indexDate = new Date(indexTime)

			return indexDate
		},
		calMonth(index) {
			const monthNum = this.calTime(index).getMonth() + 1
			return monthStr(monthNum)
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
	computed: {
	}
}
</script>
<style lang="less">
	@import '../common/less/variable.less';
	.map {
		margin-bottom: 30px;
		margin-top: 20px;

		.title {

		}
		.map-inner {
			width: @content-width;
			// height: 170px;
			border: 1px solid @border-color;
			border-radius: 3px;
			margin: 0 auto;
			margin-top: 10px;
			.block-box {
				margin-top: 25px;
				margin: 0 auto;
				margin-top: 40px;
				margin-bottom: 10px;
				width: 925px;
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
					margin-left: 10px;
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
							top: -25px;
							height: 14px;
							line-height: 14px;
							font-size: 10px;
							color: #767676;
						}
					}


				}
			}
			.legend {
				display: flex;
				// position: absolute;
				float: right;
				margin-right: 30px;
				margin-bottom: 20px;
				.less,.more {
					height: 15px;
					line-height: 12px;
					font-size: 12px;
					color: #767676;
				}
				.item-box {
					display: flex;
					margin: 0 10px;
					.item {
						width: 15px;
						height: 15px;
						flex-direction: row;
						background: green;
						margin: 0 2px;
					}
					.item:nth-child(1) {
						background: #c6e48b;
					}
					.item:nth-child(2) {
						background: #7bc96f;
					}
					.item:nth-child(3) {
						background: #239a3b;
					}
					.item:nth-child(4) {
						background: #196127;
					}
				}
			}
			.allLog {
				font-size: 14px;
				line-height: 12px;
				margin-left: 70px;
				a {
					text-decoration:none;
					color: #0366d6;
				}
			}
		}
	}
	
</style>