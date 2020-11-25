const monoogose = require('mongoose')
const Schema = monoogose.Schema


const eventSchema = new Schema({

  name: String,
  type: String,
  url: String,
  locale: String,
  images: [
    {
      ratio: String,
      url: {
        type: String, default: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=2534&q=80'
      },
      width: Number,
      height: Number,
      fallback: Boolean
    }
  ],
  dates: {
    start: {
      localDate: String,
      localTime: String,
    },
    timezone: String,
  },
  classifications: [
    {
      genre: {
        name: String
      },
      subGenre: {
        name: String
      },
    }
  ],
  info: String,
  priceRanges: [
    {
      type: { type: String },
      currency: String,
      min: Number,
      max: Number
    }
  ],
  _embedded: {
    venues: [
      {
        name: String,
        postalCode: String,
        timezone: String,
        city: {
          name: String
        },
        country: {
          name: String,
          countryCode: String
        },
        address: {
          line1: String
        },
        location: {
          type: {
            type: String,
          },
          longitude: Number,
          latitude: Number
        },
      }
    ],
  }

}, { timestamps: true })

eventSchema.index({ location: '2dsphere' })

const Event = monoogose.model('Event', eventSchema)

module.exports = Event