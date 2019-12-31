const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const schoolSchema = new Schema({
  schoolName: { type: String, unique: true, required: false },
  address: {type: String, unique: false, required: true },
  city: { type: String, unique: false, required: true },
  state: { type: String, unique: false, required: true },
  zipcode: { type: Number, unique: false, required: true },
  email: { type: String, unique: false, required: false },
  phoneNumber: { type: String, unique: false, required: false },
  schoolAdmin: {
    type: [{ type: Schema.Types.ObjectId, ref: 'SchoolAdmin' }],
    required: true
  },
  students: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    required: false
  },
  drivers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
    required: false
  } 
});

const School = mongoose.model('School', schoolSchema)
module.exports = School