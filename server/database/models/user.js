import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_WORK_FACTOR = 10
const UserSchema = new mongoose.Schema({
    username: String,
    login: String,
    id: String,
    access_token: String,
    password: String,
    avatar_url: String,
    email: String,
    html_url: String,
    lockUntil: Number,
    loginAttempts: {
	    type: Number,
	    required: true,
	    default: 0
	},
    meta: {
	    createdAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updatedAt: {
	      type: Date,
	      default: Date.now()
	    }
	}

})

UserSchema.virtual('isLocked').get(function () {
  	return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

UserSchema.pre('save', function (next) {
	let user = this

	if (!user.isModified('password')) return next()

	bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
		if (error) return next(error)
		bcrypt.hash(user.password, salt, (error, hash) => {
			if (error) return next(error)
			
			user.password = hash
			next()	
		})
	})
})


UserSchema.methods = {
	comparePassword: function (_password, password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(_password, password, function (err, isMatch) {
				if (!err) resolve(isMatch)
				else reject(err)
			})
		})
	},
	incLoginAttempts: function (user) {
	    const that = this

	    return new Promise((resolve, reject) => {
	      if (that.lockUntil && that.lockUntil < Date.now()) {
	        that.update({
	          $set: {
	            loginAttempts: 1
	          }, 
	          $unset: {
	            lockUntil: 1
	          }
	        }, function (err) {
	          if (!err) resolve(true)
	          else reject(err)
	        })
	      } else {
	        let updates = {
	          $inc: {
	            loginAttempts: 1
	          }
	        }

	        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
	          updates.$set = {
	            lockUntil: Date.now() + LOCK_TIME
	          } 
	        }

	        that.update(updates, err => {
	          if (!err) resolve(true)
	          else reject(err)
	        })
	      }
	    })
  	},
  	getToken: function() {
	  	const token = jwt.sign({name: this.username}, 'dingjianblog',{
            expiresIn: 7200
        })

        return token
  	}
}

export default mongoose.model('User', UserSchema)