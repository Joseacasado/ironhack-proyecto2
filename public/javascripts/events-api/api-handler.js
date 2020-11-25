class EventsApiHandler {
    constructor() {
        console.log('API handler initialized')

        this.axiosApp = axios.create({ baseURL: `https://rutocho.herokuapp.com/` })
    }

    getEventsList = queryString => this.axiosApp.get(`/api?${queryString}`)
    getEventDetails = id => this.axiosApp.get(`/api?id=${id}`)

}