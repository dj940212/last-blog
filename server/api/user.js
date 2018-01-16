import jwt from 'jsonwebtoken'

export const verifyToken = async (ctx, next) => {
    const token = ctx.request.headers["x-access-token"] // 从body或query或者header中获取token
    console.log("获取签名",token)

    await new Promise(function(resolve, reject) {
        jwt.verify(token, 'dingjianblog', (err, decode) => {
            if (err) {  //  时间失效/伪造token
                console.log("失效/伪造token", err.message)  
                return resolve(ctx.body={
                    err_code: 9,
                    success: false,
                    message: "失效/伪造token"
                })
            } else {
                console.log(decode.name)
                resolve(next())
            }
        })
    });
	
}
