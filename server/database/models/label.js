import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const LabelSchema = new Schema({
    name: String,
    color: {
  		default: '#000',
  		type: String
    },
    article: [{
    	type: ObjectId,
    	ref: 'Article'
    }],
    artCount: {
    	type: Number,
    	default: 0
    }
})

LabelSchema.pre('save', function(next) {
  this.artCount = this.article.length
  next()
})

export default mongoose.model('Label', LabelSchema)
