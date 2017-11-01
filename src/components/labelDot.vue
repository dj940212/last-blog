<template>
    <div class="babel">
        <div class="box">
            <div class="circle" :style="{background: color}"></div>
            <div class="title">{{title}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title','color']
    }
</script>
<style lang="less" scoped>
    @import '../common/less/variable.less';
    .babel {
        display: inline-block;
        margin-right: 5px;
        .box {
            display: flex;
            .circle {
                width: 12px;
                height: 12px;
                // margin-top: 1px;
                // background-color: yellow;
                border-radius: 50%;
            }
            .title {
                height: 12px;
                line-height: 12px;
                margin-left: 5px;
                font-size: 12px;
                color: @text-gray;
            }
        }
    }
</style>
