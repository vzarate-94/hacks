import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 6


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, lowercase: true, unique: true },
  password: String,
}, {
  timestamps: true,
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password
    return ret
  },
})

userSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, SALT_ROUNDS)
  .then(hash =>  {
    user.password = hash
    next()
  })
  .catch(err => {
    next(err)
  })
})

const User = mongoose.model('User', userSchema)

export { User }
