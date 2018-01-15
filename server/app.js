import Koa from 'koa'
import Router from './router/routes.js'
import mongoose from 'mongoose'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import Database from './middlewares/database'
import VerifyToken from './middlewares/verifyToken'
import addSession from './middlewares/session'
import cors from 'koa-cors'
import path from 'path'
import koaStatic from 'koa-static'

Database()

const app = new Koa()
const router = Router()
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../dist'

app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
addSession(app)

app.use(koaStatic(
  path.join( __dirname,  staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})


app.listen(8085)
console.log('blog-server is starting at port 8086')