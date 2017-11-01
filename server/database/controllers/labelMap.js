import mongoose from 'mongoose'

import LabelMapMod from '../models/labelMap'
import LabelMod from '../models/label'

class LabelMap {
    constructor() {

    }

    async delete( ctx ) {
        const label_id = ctx.request.body.label_id
        const labelMaps =await LabelMapMod.find({'label._id': label_id})

        labelMaps.remove()
    }

    // 查询一个标签下的所有文章
    async articles(ctx) {
        const label_id = ctx.request.body.label_id
        const articles = await LabelMapMod.find({'label._id': label_id},['article.title'])

        ctx.body = {
            success: true,
            data: articles
        }
    }

    // 查询一篇文章的所有标签
    async labels(ctx) {
        const article_id = ctx. request.body.article_id
        const labels = await LabelMapMod.find({'article._id': article_id},['label'])

        ctx.body = {
            success: true,
            data: labels
        }
    }
}

export default new LabelMap()