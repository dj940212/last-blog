import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const LabelMapSchema = new Schema({
    label: {
    	type: ObjectId,
    	ref: 'Label'
    },
    article: {
    	type: ObjectId,
    	ref: 'Article'
    }
})

export default mongoose.model('LabelMap', LabelMapSchema)
