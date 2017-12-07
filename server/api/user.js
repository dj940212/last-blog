import jwt from 'jsonwebtoken'
import axios from 'axios'
// import UserMod from '../models/user'
import config from '../secretData'

export const verifyToken = (ctx, next) => {
    return new Promise(function(resolve, reject) {
        const token = ctx.request.headers["x-access-token"] // 从body或query或者header中获取token
        console.log("获取签名",token)
        jwt.verify(token, 'dingjianblog', (err, decode) => {
            if (err) {  //  时间失效/伪造token
                console.log(err.message)  
                ctx.body={
                    success: false,
                    message: err.message
                }
            } else {
                console.log(decode.name)
                resolve(next())
            }
        })
    });
	
}

// // GitHub access_token
// export const verifyAccessToken = (ctx, next) => {
//     // const {username} = ctx.request.body
//     // return new Promise(function(resolve, reject) {
//     //     const token = ctx.request.headers["Authorization"] // 从body或query或者header中获取token
//     //     console.log("获取签名",token)

//     //     const user = await UserMod.findOne({ username: username })
//     //     if (user){
//     //         const match = await user.comparePassword(password, user.password)
//     //     } 
//     // });
// }
