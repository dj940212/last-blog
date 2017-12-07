import mongoose from 'mongoose'
import UserMod from '../models/user'
import jwt from 'jsonwebtoken'
import uuid from 'uuid'
import axios from 'axios'
import secretData from '../../secretData'

class User {
    constructor() {
        this.authCallback = this.authCallback.bind(this)
    }

    async login(ctx) {
        const {username, password} = ctx.request.body
        const user = await UserMod.findOne({ username: username })

        let match = false
        if (user) match = await user.comparePassword(password, user.password)
        if (match) {
            ctx.session.user = {
                username: user.username,
                _id: user._id
            }
            
            const token = user.getToken()
            user.token = token
            await user.save()

            return (ctx.body = {
                success: true,
                data: {
                    username: user.username,
                    token: token
                }
            })
        }

        return (ctx.body = {
            success: false,
            message: '密码错误'
        })
    }

    async githubLogin() {
        const body = ctx.request.body
        
        let user  =await UserMod.findOne({id})
        if (!user) {
            user = new UserMod(body)
        }

        ctx.body = {
            success: true,
            message: '创建新用户成功',
            data: user
        }
    }
    // 保存用户信息
    async saveUser(token) {
        const res = await axios.get(`https://api.github.com/user?${token}`)
        const {id, login, html_url, avatar_url, email} = res.data

        let user  =await UserMod.findOne({id})
        if (!user) {
            console.log("用户不存在")
            user = new UserMod({id, login, html_url, avatar_url, email})
        }
        user.access_token = token.split('=')[1]
        user.save()

        return res.data
    }
    
    // 完成gtihub验证的回调
    async authCallback(ctx) {
        const { code } = ctx.request.query
        const { client_id, client_secret } = secretData.oauth
        const url = 'https://github.com/login/oauth/access_token'
        const res = await axios.get(url,{params: {code, client_secret, client_id}})
        if (res.data.indexOf('access_token') === -1) {
            return ctx.body = {
                success: false,
                message: '验证失败',
            }
        }
        const access_token = res.data.split('&')[0]

        const user = await this.saveUser(access_token)
        
        ctx.redirect("http://localhost:8080/login?username="+ user.login)
    }

    async logout(ctx) {
        ctx.body = {
            success: true,
            message: "登出"
        }
    }

}

export default new User()