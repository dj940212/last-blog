<template>
	<div class="v-input">
		<input 
			:style="{height, width}" 
			type="text" 
			:placeholder="placeholder"
			:value="value"
  			@input="$emit('input', $event.target.value)"
  		></input>
	</div>
</template>
<script>
export default {
	props: {
		width: {
			type: String,
			default: '200px'
		},
		height: {
			type: String,
			default: '36px'
		},
		placeholder: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		className: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		}

	},
	data() {
		return {
			something: ''
		}
	}
}
</script>
<style lang="less" scoped>
	.v-input {
		display: inline-block;
		input {
			box-sizing: border-box;
            border: 1px solid #d1d5da;
            border-radius: 3px;
            color: #24292e;
            font-size: 14px;
            padding: 6px 8px;
            box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
            background-color: #fafbfc;
            margin-left: 10px;
            &:focus {
            	border: 1px solid #0366d6;
            	box-shadow: 0 0 2px 1px #0366d6;
            }
		}
	}
</style>