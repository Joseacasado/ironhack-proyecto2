const monoogose = require('mongoose')
const Schema = monoogose.Schema


const eventSchema = new Schema({ 

  name: String,
  type: String,
  test: Boolean,
  url: String,
  locale: String,
  images: [
    {
      ratio: String,
      url: String,
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