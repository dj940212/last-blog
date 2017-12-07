<template>
    <header class="header">
        <div class="header-inner">
            <div class="box">
                <div class="logo-box" @click="toPages('/')">
                    <i class="iconfont icon-github" ></i>
                </div>
                <div class="menu-icon" @click="dropMenu = !dropMenu"></div>
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
                <img class="avatar" :src="profile.avatar_url" v-show="profile.avatar_url"></img>
                <div class="login" v-show="!profile.avatar_url" @click="login">Login</div>
            </div>
        </div>
        <div class="drop-menu" v-show="dropMenu">
            <ul>
                <li class="menu-item" @click="toPages('/')">Overview</li>
                <li class="menu-item" @click="toPages('/articles')">Articles</router-link></li>
                <li class="menu-item" @click="toPages('/labels')">Labels</li>
                <li class="menu-item">About</li>
            </ul>
        </div>
    </header>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
import axios from 'axios'
import config from '@/config'
export default {
    name: 'vHeader',
    mounted() {
        
    },
    data() {
        return {
            dropMenu: false,
        }
    },
    methods: {
        ...mapMutations({
            setArticleMode: 'SET_ARTICLE_MODE',
            setIsLogin: 'SET_IS_LOGIN',
            setCurRoute: 'SET_CUR_ROUTE'
        }),
        login() {
            window.location.href= config.oauth.authorizeUrl
        },
        toPages(route) {
            this.$router.push(route)
            this.dropMenu = false
        },

    },
    computed: {
        ...mapGetters([
            'isLogin',
            'profile'
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
                .menu-icon {
                    display: none;
                    width: 24px;
                    height: 24px;
                    color: rgba(255, 255, 255,0.75);
                    margin-right: 10px;
                    background-image: url(http://ovs5x36k4.bkt.clouddn.com/%E8%8F%9C%E5%8D%95.png);
                    &:hover {
                        color: #fff ;
                    }
                    &:visited {
                        color: #c8c9cb;
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
        .drop-menu {
            ul {
                display: flex;
                margin: 0;
                padding: 0;
                justify-content: center;
                flex-direction: column;
                .menu-item {
                    list-style: none;
                    color: rgba(255, 255, 255, 0.75);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    margin: 10px 15px;
                    &:hover {
                        color: #fff ;
                    }
                    &:visited {
                        color: #c8c9cb;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 800px) {
        .header {
            .header-inner {
                padding:0 10px;
                .box {
                    .search-box {
                        input {
                            // display: none;
                            width: 150px;
                        }
                    }
                    .header-menu {
                        display: none;
                    }
                    .logo-box {
                        display: none;
                    }
                    .menu-icon {
                        display: block;
                    }
                }
            }

        }
    }
</style>
