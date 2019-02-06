/*
*  User.js
*
*  Model of "users", mongoose model
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  // id: Schema.ObjectId,
  email: String,
  password: String
})

/*
How to use in controller: 
const userModel = require('../models/User.mongo')
...
userModel.find({}, (err, docs) => {...})
userModel.create(data, (err, res) => {...})

See: https://github.com/Nikeweke/Mongo-Node/blob/master/mongo/crud.js
*/

module.exports = mongoose.model('users', userSchema)
