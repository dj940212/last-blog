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
const db = 'mongodb://blog_runner:ding15155620677@59.110.164.55:27017/blog'

Database()

const app = new Koa()
const router = Router()

app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
addSession(app)


app.listen(8086)
console.log('blog-server is starting at port 8086')