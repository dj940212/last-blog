const jwt = require('jsonwebtoken')

const verifyToken = (ctx,next) => {
	const token = ctx.request.headers["x-access-token"] // 从body或query或者header中获取token
	jwt.verify(token, 'dingjianblog', (err, decode) => {
        if (err) {  //  时间失效的时候/ 伪造的token          
           ctx.body={err:err}
        } else {
            // rq.decode = decode; 
            console.log(decode.name);   // today  is  a  good  day
            next();
        }
    })
}
export default verifyToken