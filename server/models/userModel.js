// server/models/userModel.js
const mongoose = require('mongoose');
var validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true,
  unique:[true,"Email already exist"],
  validate(value){
    if(!validator.isEmail(value)){
        throw new Error("email is not valid");
    }
  }
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'basic',
  enum: ["basic", "supervisor", "admin"]
 },
 accessToken: {
  type: String
 }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;