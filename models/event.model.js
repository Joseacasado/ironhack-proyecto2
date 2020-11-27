const monoogose = require('mongoose')
const Schema = monoogose.Schema


const eventSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  type: String,
  url: {
    type: String,
    defaul: 'https://www.ticketmaster.es/musica/todos-musica/10001/events'
  },
  locale: String,
  images: [
    {
      ratio: {
        type: String,
        default: '16_9'
      },
      url: {
        type: String,
        default: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=2534&q=80'
      },
      width: Number,
      height: Number,
      fallback: {
        type: Boolean,
        default: false
      }
    }
  ],
  dates: {
    start: {
      localDate: {
        type: String,
        required: true
      },
      localTime: {
        type: String,
        default: '22:00'
      },
    },
    timezone: {
      type: String,
      default: 'Europe/London'
    },
  },
  classifications: [
    {
      genre: {
        name: {
          type: String,
          required: true
        }
      },
      subGenre: {
        name: {
          type: String,
          default: 'Pop'
        }
      },
    }
  ],
  info: String,
  priceRanges: [
    {
      type: { type: String },
      currency: {
        type: String,
        default: 'EUR'
      },
      min: {
        type: Number,
        default: 0
      },
      max: Number
    }
  ],
  _embedded: {
    venues: [
      {
        name: {
          type: String,
          required: true,
          default: 'WiZink Center'
        },
        type: {
          type: String,
          default: 'Arena'
        },
        postalCode: {
          type: String,
          default: '28009'
        },
        timezone: {
          type: String,
          default: 'Europe/London'
        },
        city: {
          name: {
            type: String,
            default: 'Madrid'
          }
        },
        country: {
          name: {
            type: String,
            default: 'Spain'
          },
          countryCode: {
            type: String,
            default: 'ES'
          }
        },
        address: {
          line1: {
            type: String,
            default: 'Av. Felipe II, s/n'
          }
        },
        location: {
          type: {
            type: String,
          },
          longitude: {
            type: Number,
            default: 40.42406643208072
          },
          latitude: {
            type: Number,
            default: -3.6717619310281155
          }
        },
      }
    ],
  }

}, { timestamps: true })

eventSchema.index({ location: '2dsphere' })

const Event = monoogose.model('Event', eventSchema)

module.exports = Event