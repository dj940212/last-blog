<template>
    <header class="header">
        <div class="header-inner">
            <div class="logo-box">
                <span class="logo"></span>
            </div>
            <div class="search-box">
                <input type="text" name="" value="" placeholder="Search GitHub">
            </div>
            <div class="header-menu">
                <ul>
                    <li class="menu-item">Pull requests</li>
                    <li class="menu-item">Issues</li>
                    <li class="menu-item">Marketplace</li>
                    <li class="menu-item">Explore</li>
                </ul>
            </div>
            <div class="icon-box">
                <div class="messge"></div>
                <div class="add"></div>
                <div class="avatar"></div>
            </div>
        </div>
    </header>
</template>
<script>
import markdownIt from 'markdown-it'
export default {
    name: 'myheader',
    mounted() {
    }
}
</script>
<style lang="less" scoped>
    @import "../common/less/variable.less";
    .header {
        background: @header-bgcolor;
        .header-inner {
            padding: 11px 0;
            max-width: @content-width;
            margin: 0 auto;
            display: flex;
            align-items: center;
            .logo-box{
                margin-right: 15px;
                .logo {
                    width: 32px;
                    height: 32px;
                    display: block;
                    background: url(http://icons.iconarchive.com/icons/danleech/simple/512/github-icon.png);
                    background-size: contain;
                    border-radius: 16px;
                }
            }
            .search-box {
                input {
                    height: 30px;
                    width: 300px;
                    background-color: #3f4448;
                    border: 0;
                    border-radius: 3px;
                    padding: 0 8px;
                    color: rgba(255, 255, 255, 0.75);
                    line-height: 18px;
                    // font-size: 16px;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .header-menu {
                ul {
                    display: flex;
                    margin: 0;
                    padding: 0;
                    .menu-item {
                        list-style: none;
                        margin-left: 16px;
                        color: rgba(255, 255, 255, 0.75);
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
            }
        }

    }
</style>
