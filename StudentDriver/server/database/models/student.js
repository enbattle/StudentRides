const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define studentSchema
const studentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address: { type: String, unique: false, required: true },
  graduation_year: { type: Date, required: true },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  }
})

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
