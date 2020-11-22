const mongoose = require('mongoose')
const Event = require('../models/event.model')

const dbTitle = 'proyecto2'
mongoose.connect(`mongodb://localhost/${ dbTitle }`)

Event.collection.drop()

const events = [            // TO-DO
  {
    title: "15 años con Miscelánea",
    description: "El grupo Miscelánea cumple sus 15 años de existencia y para celebrarlo se presenta con una recopilación de poemas, canciones y textos que ha seleccionado de lo representado desde 2005.",
    free: true,
    price: 0,
    dtstart: "2020-11-27 19:00:00.0",
    dtend: "2020-11-27 23:59:00.0",
    link: "http://www.madrid.es/sites/v/index.jsp?vgnextchannel=ca9671ee4a9eb410VgnVCM100000171f5a0aRCRD&vgnextoid=6e585bf728475710VgnVCM1000001d4a900aRCRD",
    image: "https://www.madrid.es/UnidadWeb/UGBBDD/EntidadesYOrganismos/CulturaYOcio/InstalacionesCulturales/CentrosCulturalesMunicipales/CCLatina/Ficheros/CCFdoRiosFachada2.JPG",
    address: {
      postalCode: "28047",
    },
    location: {
      type: "Point",
      coordinates: [ 40.39552931214334, -3.7562667464373223 ]
    }
  },
  {
    title: "25 N día internacional de la eliminación de la violencia contra la mujer.",
    description: "",
    free: true,
    price: 0,
    dtstart: "2020-11-25 10:30:00.0",
    dtend: "2020-11-25 23:59:00.0",
    link: "http://www.madrid.es/sites/v/index.jsp?vgnextchannel=ca9671ee4a9eb410VgnVCM100000171f5a0aRCRD&vgnextoid=f8ce22cb8b6b5710VgnVCM1000001d4a900aRCRD",
    image: "https://www.madrid.es/UnidadesDescentralizadas/DistritoRetiro/FICHEROS/FICHEROS%20ACTIVIDADES%20NOVIEMBRE/Cartel25N-RETIRO.jpg",
    address: {
      postalCode: "28007",
    },
    location: {
      type: "Point",
      coordinates: [ 40.402626951699574, -3.668072173358071 ]
    }
  },
  {
    title: "25N: Toda una vida",
    description: "",
    free: true,
    price: "",
    dtstart: "2020-11-25 12:30:00.0",
    dtend: "2020-11-25 23:59:00.0",
    link: "http://www.madrid.es/sites/v/index.jsp?vgnextchannel=ca9671ee4a9eb410VgnVCM100000171f5a0aRCRD&vgnextoid=335267ea256b5710VgnVCM2000001f4a900aRCRD",
    image: "https://www.madrid.es/UnidadesDescentralizadas/IgualdadDeOportunidades/ContenidosBasicos/Actividades/Espacios%20Igualdad/2020/nievestorres/ficheros/todaunavida25N.jpg",
    address: {
      postalCode: "28016"
    },
    location: {
      type: "Point",
      coordinates: [ 40.46088981165102, -3.6700689174427326 ]
    }
  },
  {
    title: "Ana María Labad",
    description: "Concierto de piano.",
    free: false,
    price: "",
    dtstart: "2020-11-21 18:30:00.0",
    dtend: "2020-11-21 23:59:00.0",
    link: "http://www.madrid.es/sites/v/index.jsp?vgnextchannel=ca9671ee4a9eb410VgnVCM100000171f5a0aRCRD&vgnextoid=5fb9675711565710VgnVCM1000001d4a900aRCRD",
    image: "https://www.madrid.es/UnidadWeb/UGBBDD/Actividades/Distritos/Salamanca/Actividades/ficheros/2211Labad.png",
    address: {
      postalCode: "28028"
    },
    location: {
      type: "Point",
      coordinates: [ 40.42206601994432, -3.662968075865235 ]
    }
  }
]

Event
  .create(events)
  .then(resp => {
    console.log((`Created ${ resp.length } events`))
    mongoose.connection.close()
  })
  .catch(err => console.log("There was an error:", err))