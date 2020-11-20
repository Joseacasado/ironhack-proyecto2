const { text } = require('body-parser')
const monoogose = require('mongoose')
const Schema = monoogose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    set: text => text.charAt(0).toUpperCase() + text.substring(1)
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

const User = monoogose.model('User', userSchema)

module.exports = User