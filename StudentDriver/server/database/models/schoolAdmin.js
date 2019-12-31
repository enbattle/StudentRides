const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define studentSchema
const schoolAdminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  }
})

const SchoolAdmin = mongoose.model('SchoolAdmin', schoolAdminSchema)
module.exports = SchoolAdmin
