import * as axios from "axios"
import { HOST } from '../config'

axios.defaults.baseURL = HOST
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken")
    config.headers = {
      'Content-Type': 'application/json',
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
