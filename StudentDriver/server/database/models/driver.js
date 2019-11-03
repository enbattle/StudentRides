const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define driverSchema
const driverSchema = new Schema({
    driver:{
		type:Schema.Types.ObjectId,
		ref:'Driver'

    },
    latitude: { type: Number, unique: false, required: true },
    longitude: { type: Number, unique: false, required: true },
    car: {type: String,unique:false, required:true},
    plate:{type: String, unique:true, required:ture}
	

});

driverSchema.methods = {
    //
  }



const Driver = mongoose.model('Driver', driverSchema)
module.exports = driver;

