<template>
	<div class="map">
		<div class="des">513 contributions in the last year</div>
		<div class="map-inner">
			
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
			width: @content-width;
			height: 170px;
			border: 1px solid @border-color;
			border-radius: 3px;
		}
	}
	
</style>