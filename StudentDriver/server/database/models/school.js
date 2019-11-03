const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const schoolSchema = new Schema({

	schoolName: { type: String, unique: true, required: false },
  password: { type: String, unique: false, required: false },
  address: {type: String, unique: false, required: true},
  latitude: { type: Number, unique: false, required: true },
  longitude: { type: Number, unique: false, required: true },
  phoneNumber: { type: String, unique: false, required: false },

});

schoolSchema.methods = {
    checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
    hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
    }
  }

schoolSchema.pre('save', function (next) {
    if (!this.password) {
      console.log('models/school.js =======NO PASSWORD PROVIDED=======')
      next()
    } else {
      console.log('models/school.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
    }
  })

const School = mongoose.model('School', schoolSchema)
module.exports = School