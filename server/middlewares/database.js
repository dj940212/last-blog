import mongoose from 'mongoose'
import User from '../database/models/user'
import secretData from '../secretData'


export default () => {
    mongoose.set('debug', true)

    mongoose.connect(secretData.db)

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(secretData.db)
    })
    mongoose.connection.on('error', err => {
        console.log(err)
    })

    mongoose.connection.on('open', async ()=> {
        console.log('Connected to MongoDB Success')

        let user = await User.findOne(secretData.user.username)

        if (!user) {
            new User(secretData.user).save()
            console.log("写入管理员数据")
        }
    })
}