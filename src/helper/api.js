import * as axios from "axios"

export default class Api {
  constructor() {
    this.api_url = "http://localhost:3001"
    this.client = null
  }

  init = () => {
    const accessToken = localStorage.getItem("accessToken")
    let headers = {
      Accept: "application/json",
    }

    if (accessToken) {
      headers.Authorization = "Bearer " + accessToken
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 5000,
      headers: headers,
    })

    return this.client
  }

  signup = (data) => {
    return this.init().post("/users", data)
  }

  login = ({ email, password }) => {
    const body = { email, password }
    return this.init().post("/auth/login", body)
  }

  getUsers = () => {
    return this.init().get("/users")
  }

  me = () => {
    return this.init().get("/user/me")
  }
}
