const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define driverSchema
const driverSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'

  },
  address: { type: String, unique: false, required: true },
  city: { type: String, unique: false, required: true },
  state: { type: String, unique: false, required: true },
  zipcode: { type: Number, unique: false, required: true },
  car: {
    type: Schema.Types.ObjectId, ref: 'Schema', required: true
  },
  plate: { type: String, unique: true, required: true },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: false
  },
  rating: { type: Number, unique: false, required: true, default: -1 },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // stores a list of all comments associated with user
  }
});

driverSchema.methods = {
  //
}

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver

