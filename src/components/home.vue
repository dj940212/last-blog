<template lang="html">
    <div class="overview">
        <ul>
            <router-link to='/overview'><li>OverView</li></router-link>
            <router-link to='/list'><li>AllArticle</li></router-link>
            <li>TimeLine</li>
            <li>Followers</li>
            <li>Following</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
    @import '../common/less/variable.less';
    .overview {
        width: @content-width;
        margin: 0 auto;
        ul {
            display: flex;
            margin-left: 5px;
            padding-left: 0;
            border-bottom: 1px solid @border-color;
            li {
                box-sizing: border-box;
                list-style: none;
                height: 63px;
                padding: 0 20px;
                line-height: 63px;
                color: #586069;
                cursor: pointer;
            }
            li.active {
                border-bottom:  2px solid #e36209;
                color: #24292e;
                
            }
        }
        .router-link-active {
            border-bottom:  2px solid #e36209;
            color: #24292e;
            // border: 0;
        }
    }
</style>
