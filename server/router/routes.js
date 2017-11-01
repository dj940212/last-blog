import Router from 'koa-router'
import Article from '../database/controllers/article'
import Label from '../database/controllers/label'
import Activity from '../database/controllers/activity'
import User from '../database/controllers/user'
import { verifyToken } from '../api/user'

export default () => {
	const router = new Router({ prefix: '/api' })

    // article
	router.post('/article/save', verifyToken, Article.new)
    router.get('/article/list', Article.list)
    router.post('/article/update',verifyToken, Article.update)
    router.post('/article/delete',verifyToken, Article.delete)
    router.get('/article/read', Article.findOne)
    router.post('/article/addLabel',verifyToken, Article.addLabel)
	router.post('/article/delLabel',verifyToken, Article.delLabel)
    // label
    router.get('/labels', Label.allLabels)
    router.post('/label/new',verifyToken, Label.new)
    router.post('/label/update',verifyToken, Label.update)
    router.post('/label/delete',verifyToken, Label.delete)

    // activity
    router.get('/activity/all', Activity.all)
    router.get('/activity/oneday', Activity.oneDay)

    // user
    router.post('/login', User.login)
    router.post('/logout', verifyToken, User.logout)

	return router
}
