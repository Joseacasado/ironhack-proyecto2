const monoogose = require('mongoose')
const Schema = monoogose.Schema

const eventSchema = new Schema({        // TO-DO
  title: {
    type: String,
    required: true
  },
  description: String,
  free: Boolean,
  price: Number,
  dtstart: Date,   
  dtend: Date,   
  link: String,
  image: String,
  address: {
    postalCode: String,
    required: true
  },
  location: {
    type: { type: String },
    coordinates: [ Number ],
    required: true
  }
}, { timestamps: true })

eventSchema.index({ location: '2dsphere' })

const Event = monoogose.model('Event', eventSchema)

module.exports = Event