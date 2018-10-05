const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type:String,required: [true, 'Name must be provided']},
  lastName: {type:String,required: [true, 'Last name must be provided']},
  password: {type:String,required: [true, 'Password must be provided']},
  userName: {type:String,required: [true, 'Username must be provided']},
})

const User = mongoose.model('User', userSchema);

module.exports = {
  User
}
