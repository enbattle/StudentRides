//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config();

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }, function(error){
    console.log(error)
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

module.exports = mongoose.connection