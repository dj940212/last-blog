<template>
	<div class="map">
		<div class="des">513 contributions in the last year</div>
		<div class="map-inner">
			<div class="block">
				<div class="item" v-for="i in 368"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'activityMap'
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
			margin: 20px auto;
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