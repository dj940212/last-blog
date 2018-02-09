import mongoose from 'mongoose'
import User from '../database/models/user'
import config from '../config'


export default () => {
    const options = {
        useMongoClient: true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    }

    mongoose.set('debug', (coll, method, query, doc, options) => {
        let set = {
            coll: coll,
            method: method,
            query: query,
            doc: doc,
            options: options
        }

        console.log(set)
    })

    mongoose.Promise = global.Promise
    mongoose.connect(config.db, options)

    mongoose.connection.on('disconnected', () => {mongoose.connect(config.db)})
    mongoose.connection.on('error', err => { console.log(err) })

    mongoose.connection.on('open', async ()=> {
        console.log('Connected to MongoDB Success')
        let user = await User.findOne({username: config.user.username})
        if (!user) {
            new User(config.user).save()
            console.log("写入管理员数据")
        }
    })
}