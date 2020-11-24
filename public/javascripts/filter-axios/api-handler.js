class EventsApiHandler {
    constructor() {
        console.log('API handler initialized')

        this.axiosApp = axios.create({ baseURL: `http://localhost:3000/` })
    }

    getEventsList = queryString => this.axiosApp.get(`/api?${queryString}`)
    // getEventDetails = id => this.axiosApp.get(`&id=${id}`)

}