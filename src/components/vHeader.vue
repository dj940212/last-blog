<template>
    <header class="header">
        <div class="header-inner">
            <div class="box">
                <div class="logo-box" @click="toPages('/')">
                    <i class="iconfont icon-github"></i>
                </div>
                <div class="search-box">
                    <input type="text" name="" value="" placeholder="Search Blog">
                </div>
                <div class="header-menu">
                    <ul>
                        <li class="menu-item" @click="toPages('/')">Overview</li>
                        <li class="menu-item" @click="toPages('/articles')">Articles</router-link></li>
                        <li class="menu-item" @click="toPages('/labels')">Labels</li>
                        <li class="menu-item">About</li>
                    </ul>
                </div>

            </div>
            <div class="icon-box">
                <div class="message"><i class="iconfont icon-xiaoxi"></i></div>
                <div class="add" @click="toPages('/new')">+</div>
                <div class="avatar" v-show="isLogin"></div>
                <div class="login" v-show="!isLogin" @click="login">Login</div>
            </div>
        </div>
    </header>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    name: 'vHeader',
    mounted() {
        
    },
    methods: {
        ...mapMutations({
            setArticleMode: 'SET_ARTICLE_MODE',
            setIsLogin: 'SET_IS_LOGIN',
            setCurRoute: 'SET_CUR_ROUTE'
        }),
        login() {
            this.$router.push('/login')
            this.setCurRoute(this.$route.fullPath)
        },
        toPages(route) {
            this.$router.push(route)
        },

    },
    computed: {
        ...mapGetters([
            'isLogin'
        ])
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
                padding: 9px 0;
                max-width: @content-width;
                display: flex;
                align-items: center;
                .logo-box{
                    margin-right: 15px;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    background: #fff;
                    text-align: center;
                    line-height: 32px;
                    cursor: pointer;
                    .icon-github {
                        font-size: 30px;
                        position: relative;
                        top: 4px;
                        // right: 1px;
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
                            cursor: pointer;
                            &:hover {
                                color: #fff ;
                            }
                            &:visited {
                                color: #c8c9cb;
                            }
                        }
                    }
                    .router-link-exact-active {
                        color: #fff;
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
                    &:hover {
                        color: #fff;
                    }
                }
                .avatar {
                    height: 20px;
                    width: 20px;
                    background: url(http://ovs5x36k4.bkt.clouddn.com/06.jpg);
                    background-size: 20px 20px;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .login {
                    cursor: pointer;
                    &:hover {
                        color: #fff;
                    }
                }
                .message {
                    position: relative;
                    top: -1px;
                    cursor: pointer;
                    .iconfont {
                        font-size: 18px;
                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }

        }
    }
</style>
