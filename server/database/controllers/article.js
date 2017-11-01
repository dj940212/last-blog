import mongoose from 'mongoose'
import ArticleMod from '../models/article'
import ActivityMod from '../models/activity'
import uuid from 'uuid'
import formatTime from '../../utils/formatTime'
import LabelMapMod from '../models/labelMap'
import LabelMod from '../models/label'

class Article {
    constructor() {}

    async new(ctx) {
        const key = uuid.v4()
        const {title, content, description} = ctx.request.body
        let article

        try {
            article = new ArticleMod({
                title: title,
                content: content,
                description: description
            })
            article = await article.save()

            const date = formatTime(new Date())
            let activity = await ActivityMod.findOne({date: date})

            if (activity) {
                const log = {
                    article_id: article._id,
                    article_title: article.title,
                    operationType: 'created'
                }

                activity.log.push(log)
                await activity.save()
            }else {
                let newActivity = new ActivityMod({
                    log: [{
                        article_id: article._id,
                        article_title: article.title,
                        operationType: 'created'
                    }]
                })
                await newActivity.save()
            }

        }catch(e) {
            ctx.body = {
                message: '保存失败',
            }
        }

        ctx.body = {
            success: 'true',
            message: '保存成功',
            data: {
                _id: article._id,
                title: article.title,
                desc: article.description
            }
        }
    }

    async list(ctx) {
        const count = ctx.request.query.count || 100
        const skipNum = ctx.request.query.skipNum || 0
        const sort = ctx.request.query.sort || -1

        const data = await ArticleMod.find({},['title', 'description', 'meta', 'label'])
            .populate({ path: 'label', select: 'name color artCount' })
            .sort({'meta.updateAt': sort})
            .skip(parseInt(skipNum))
            .limit(parseInt(count))

        ctx.body = {
            message: 'success',
            data: data
        }
    }

    async update(ctx) {

        const {content, description, title, _id, babel} = ctx.request.body

        let article = await ArticleMod.findOne({_id:_id})
        if(title && content && description) {
          article.title = title
          article.content = content
          article.description = description
          await article.save()
        }
        // 保存操作日志
        try {
            const date = formatTime(new Date())
            let activity = await ActivityMod.findOne({date: date})

            if (activity) {
                console.log("当天有日志")
                const log = {
                    article_id: article._id,
                    article_title: article.title,
                    operationType: 'updated'
                }
                activity.log.push(log)
                await activity.save()
            }else {
                console.log("当天没有日志")
                const newActivity = new ActivityMod({
                    log:[{
                        article_id: article._id,
                        article_title: article.title,
                        operationType: 'updated'
                    }]
                })
                await newActivity.save()
            }

        }catch(e) {
            ctx.body = {
                message: '更新失败',
            }
        }

        ctx.body = {
            message: '保存成功',
            data: article
        }
    }

    async delete(ctx) {
        const _id = ctx.request.body._id
        try {
            // 保存日志
            const article = await ArticleMod.findOne({_id: _id})
            const date = formatTime(new Date())
            let activity = await ActivityMod.findOne({date: date})

            if (activity) {
                const log = {
                    article_id: article._id,
                    article_title: article.title,
                    operationType: 'deleted'
                }
                activity.log.push(log)
                await activity.save()
            }else {
                const newActivity = new ActivityMod({
                    article_id: article._id,
                    article_title: article.title,
                    operationType: 'deleted'
                })
                await newActivity.save()
            }
            // 删除文章
            await ArticleMod.remove({_id: _id})
        }catch(e) {
            ctx.body = {
                message: 'failed'
            }
        }

        ctx.body = {
            message: 'success'
        }
    }

    async findOne(ctx) {
        const _id = ctx.request.query._id

        if (_id) {
            const data = await ArticleMod.findOne({_id:_id})
               .populate({ path: 'label', select: 'name color artCount' })
            ctx.body = {
                message: 'success',
                data: data
            }
        }
    }

    async addLabel(ctx) {
        const {label_id, article_id} = ctx.request.body
        let article = await ArticleMod.findOne({_id: article_id, label: {$in: [label_id]}})
        if (article) {
            ctx.body = {
                success: false,
                message: '该标签已存在'
            }
            return
        }

        article = await ArticleMod.findOne({_id: article_id})
        let label = await LabelMod.findOne({_id: label_id})

        article.label.push(label)
        label.article.push(article)
        article = await article.save()
        label = await label.save()

        ctx.body = {
            success: true,
            message: '添加标签成功',
            data: article.label
        }
    }

    async delLabel(ctx) {
      const {article_id, label_id} = ctx.request.body
      let article =await ArticleMod.findOne({_id: article_id})

      console.log(article.label)
      const index = article.label.indexOf(label_id)
      article.label.splice(index,1)

      article = await article.save()

      ctx.body = {
        success: true,
        data: article.label
      }
    }
}

export default new Article()
