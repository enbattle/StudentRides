const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define driverSchema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    unique: false,
    required: true,
    default: ''
  }
});

commentSchema.methods = {
  //
}

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
