const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define driverSchema
const carSchema = new Schema({
  carName: { type: String, unique: false, required: true },
  year: { type: Number, unique: false, required: false },
  image: { type: String, unique: false, required: true }
})

carSchema.methods = {
  //
}

const Car = mongoose.model('Car', carSchema)
module.exports = Car
