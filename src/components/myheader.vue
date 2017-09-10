<template>
    <header class="header">
        <div class="header-inner">
            <div class="box">
                <div class="logo-box">
                    <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                </div>
                <div class="search-box">
                    <input type="text" name="" value="" placeholder="Search GitHub">
                </div>
                <div class="header-menu">
                    <ul>
                        <li class="menu-item"><router-link to="/">Pull requests</router-link></li>
                        <li class="menu-item"><router-link to="/list">Issues</router-link></li>
                        <li class="menu-item">Marketplace</li>
                        <li class="menu-item">Explore</li>
                    </ul>
                </div>

            </div>
            <div class="icon-box">
                <div class="message"><i class="iconfont icon-xiaoxihui"></i></div>
                <div class="add" @click="toWriteArticle">+</div>
                <div class="avatar"></div>
            </div>
        </div>

    </header>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'myheader',
    mounted() {
    },
    methods: {
        ...mapMutations({
            setArticleMode: 'SET_ARTICLE_MODE'
        }),
        toWriteArticle() {
            this.setArticleMode('write')
            this.$router.push({ name: 'write'})
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../common/less/variable.less";
    .header {
        background: @header-bgcolor;
        .header-inner {
            max-width: @content-width;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .box {
                padding: 11px 0;
                max-width: @content-width;
                display: flex;
                align-items: center;
                .logo-box{
                    margin-right: 15px;
                    svg {
                        // background-color: #fff;
                        color: #fff;
                        border-radius: 16px;
                    }
                }
                .search-box {
                    input {
                        box-sizing: border-box;
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
            .icon-box {
                color: rgba(255, 255, 255,0.75);
                align-items: center;
                align-self: center;
                display: flex;
                justify-content: space-between;
                width: 100px;
                .add {
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    position: relative;
                    top: -2px;
                }
                .avatar {
                    height: 20px;
                    width: 20px;
                    background: url(https://avatars0.githubusercontent.com/u/15308542?v=4&s=40);
                    background-size: 20px 20px;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .message {
                    position: relative;
                    cursor: pointer;
                    .iconfont {
                        font-size: 16px;
                    }
                }
            }

        }


    }
</style>
