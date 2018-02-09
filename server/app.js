import Koa from 'koa'
import Router from './router/routes.js'
import mongoose from 'mongoose'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import Database from './middlewares/database'
import VerifyToken from './middlewares/verifyToken'
import cors from 'koa-cors'
import path from 'path'
import koaStatic from 'koa-static'

Database()

const app = new Koa()
const router = Router()
// 静态资源目录对于相对入口文件app.js的路径
const staticPath = '../dist'

app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaStatic(path.join( __dirname,  staticPath)))

app.listen(8085)
console.log('starting at port 8085')