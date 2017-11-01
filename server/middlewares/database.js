import mongoose from 'mongoose'
import User from '../database/models/user'


export default () => {
    mongoose.set('debug', true)

    mongoose.connect('mongodb://blog_runner:ding15155620677@59.110.164.55:27017/blog')

    mongoose.connection.on('disconnected', () => {
        mongoose.connect('mongodb://blog_runner:ding15155620677@59.110.164.55:27017/blog')
    })
    mongoose.connection.on('error', err => {
        console.log(err)
    })

    mongoose.connection.on('open', async ()=> {
        console.log('Connected to MongoDB Success')

        let user = await User.findOne({username: '2902273280@qq.com'})

        if (!user) {
            new User({
                username: '2902273280@qq.com',
                password: '15155620677'
            }).save()
            console.log("写入管理员数据")
        }
    })
}