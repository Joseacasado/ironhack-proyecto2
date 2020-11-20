const monoogose = require('mongoose')
const Schema = monoogose.Schema

const pictureSchema = new Schema({
  imageName: String,
  path: String,
  originalName: String
}, { timestamps: true })

const Picture = monoogose.model('Picture', pictureSchema)

module.exports = Picture