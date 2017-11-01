import mongoose from 'mongoose'

import LabelMod from '../models/label'

class Label {
    constructor() {

    }

    async new( ctx ) {
        const {name,color} = ctx.request.body
        let label = await LabelMod.findOne({name: name})

        if (!label) {
            const newLabel = await new LabelMod({name: name, color: color}).save()
            ctx.body = {
                success: true,
                message: "添加Label成功",
                data: newLabel
            }

            return
        }

        ctx.body = {
            success: false,
            message: 'Label已存在',
        }

    }

    async delete(ctx) {
        const _id = ctx.request.body._id

        try {
            await LabelMod.remove({_id:_id})
        }catch(e){
            ctx.body = {
                success: false,
                message: e,
            }
        }

        ctx.body = {
            success: true,
            message: '删除成功'
        }
    }

    async allLabels(ctx) {
        const {limit=100, skip=0, sort=-1} = ctx.request.query
        let labels = await LabelMod.find({},['name', 'color', 'artCount'])
                .populate({ path: 'article',select: 'title description label meta',populate: {path: 'label'} })
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .sort({'artCount': sort})

        ctx.body = {
            success: true,
            data: labels
        }
    }

    async update(ctx) {
        const {name,color,_id} = ctx.request.body

        let label = await LabelMod.findOne({_id:_id})
        label.name = name
        label.color = color
        label = await label.save()

        ctx.body = {
            success: true,
            message: '修盖label成功',
            data: label
        }

    }

    // async getLabelArts(ctx) {
    //     const _id = ctx.request.query._id
    //     let label = await LabelMod.findOne({_id:_id})

    // }
}

export default new Label()
