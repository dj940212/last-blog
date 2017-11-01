import mongoose from 'mongoose'
import formatTime from '../../utils/formatTime'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ActivitySchema = new Schema({
    log:[{
        article_id: String,
        article_title: String,
        operationType: String,
        createAt: {
            type: Date,
            default: Date.now()
        }
    }],
    date: String,
    logLen: {
        type: Number,
        default: 0
    }
})

ActivitySchema.pre('save', function(next) {
    if (this.isNew) {
        this.date = formatTime(new Date()) 
    }
    console.log("logLen:",this.log.length)
    this.logLen = this.log.length || 0

    next()
})

export default mongoose.model('Activity', ActivitySchema)