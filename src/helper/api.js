import * as axios from 'axios'

export default class Api {
  constructor() {
    this.api_url = 'http://localhost:3001'
    this.client = null
  }

  init = () => {
    let headers = {
      Accept: 'application/json'
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 5000,
      headers: headers
    })

    return this.client
  }

  signup = (data) => {
    return this.init().post('/users', data)
  }

  getUsers = () => {
    return this.init().get('/users')
  }
}
