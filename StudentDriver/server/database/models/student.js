const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define studentSchema
const studentSchema = new Schema({
    student:{
		type:Schema.Types.ObjectId,
		ref:'Student'

    },
    latitude: { type: Number, unique: false, required: true },
    longitude: { type: Number, unique: false, required: true }
	

});

studentSchema.methods = {
    setLocation:function() {
        student.update({title:"Get geolocation"},{
            $set:{
                latitude:this.props.student.latitude,
                longitude:this.props.product.longitude
            }
        });

        
    }
  }



const Student = mongoose.model('Student', studentSchema)
module.exports = Student
