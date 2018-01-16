<template>
    <div class="login">
        <div class="login-inner">
            <div class="logo">
                <div class="logo-inner">
                    <i class="iconfont icon-github"></i>
                </div>
                
            </div>
            <div class="title">
                <h1>Sign in to Last Blog</h1>
            </div>
            <div class="main">
                <form action="">
                    <label for="">Username</label>
                    <input type="text" class="username" v-model="username">
                    <label for="">Password</label>
                    <input type="password" class="password" v-model="password">
                    <input @click="signIn" type="button" class="button" value="Sign in">
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations, mapGetters} from 'vuex'
    import cookie from 'js-cookie' 
    import config from '@/config'
    import axios from 'axios'
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            ...mapMutations({
                setIsLogin: 'SET_IS_LOGIN',
                setToken: 'SET_TOKEN'
            }),
            async signIn() {
                try {
                    const res = await axios.post(config.api.loginUrl,{username: this.username, password: this.password})
                    if (res.data.success) {
                        history.go(-1)
                        this.setIsLogin(true)
                        this.setToken(res.data.data.token)
                        cookie.set('token', res.data.data.token, { expires: 1 })
                    }
                }catch(e) {
                    console.log(e)
                }
            },

        },
        computed: {
            ...mapGetters([
                'curRoute'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .login {
        height: 100%;
        width: 100%;
        background-color: #f9f9f9;
        position: absolute;
        z-index: 100;
        .login-inner {
            width: 308px;
            margin: 0 auto;
            .logo {
                padding-top: 52px;
                padding-bottom: 24px;
                .logo-inner{
                    display: block;
                    width: 48px;
                    height: 48px;
                    background-color: #fff;
                    margin: 0 auto;
                    border-radius: 50%;
                    line-height: 48px;
                    text-align: center;
                    .icon-github {
                        font-size: 40px;
                        position: relative;
                        top: 5px;
                    }
                }
            }
            .title {
                margin-bottom: 15px;
                h1 {
                    font-size: 22px;
                    font-weight: 300;
                    letter-spacing: -0.5px;
                    text-align: center;
                    color: #333;
                }
            }
            .main {
                form {
                    width: 308px;
                    height: 235px;
                    box-sizing: border-box;
                    border: 1px solid #d8dee2;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    font-size: 14px;
                    label {
                        display: block;
                        margin-bottom: 7px;
                        font-weight: 600;
                    }
                    input {
                        box-sizing: border-box;
                        margin-top: 5px;
                        height: 32px;
                        margin-bottom: 15px;
                        display: block;
                        width: 100%;
                        min-height: 34px;
                        padding: 6px 8px;
                        line-height: 20px;
                        color: #24292e;
                        border: 1px solid #d1d5da;
                        border-radius: 3px;
                        // outline: none;
                        box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
                    }
                    input.button {
                        margin-top: 20px;
                        text-align: center;
                        color: #fff;
                        background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
                        background-color: #28a745;
                        padding: 6px 12px;
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 20px;
                        white-space: nowrap;
                        vertical-align: middle;
                        cursor: pointer;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
