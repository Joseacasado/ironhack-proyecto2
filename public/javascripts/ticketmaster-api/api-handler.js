class EventsApiHandler {
  constructor() {
    console.log('API handler initialized')

    this.axiosApp = axios.create({ baseURL: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=jB9GX5ZTKP9G2k8SqGVvrV9q9UkpNl5P&segmentName=Music` })
  }

  getEventsList = filterinfo => this.axiosApp.get(`&city=${filterinfo.city}&classificationName=${filterinfo.genre}&sort=${filterinfo.sort}&keyword=${filterinfo.keyword}`)
  getEventDetails = id => this.axiosApp.get(`&id=${id}`)

  // getSliderList = () => axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?segmentName=Music&apikey=${ticketKey}&sort=random&size=8`)
}