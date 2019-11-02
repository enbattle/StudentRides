const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: true, required: false },
	password: { type: String, unique: false, required: false },
	firstName: { type: String, unique: false, required: false },
    lastName: { type: String, unique: false, required: false },
    email: { type: String, unique: false, required: false },
    phoneNumber: { type: String, unique: true, required: false },
    roles: { type: String, required: false },

});

userSchema.methods = {
    checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
    hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
    }
  }

userSchema.pre('save', function (next) {
    if (!this.password) {
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
      next()
    } else {
      console.log('models/user.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
    }
  })

const User = mongoose.model('User', userSchema)
module.exports = User