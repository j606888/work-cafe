import apiPath from "../config/apiPath"
import axios from 'axios'

export const login = (data) => {
  const body = JSON.stringify(data)

  return axios.post(apiPath.auth.login, body)
}

export const signup = (data) => {
  const body = JSON.stringify(data)

  return axios.post(apiPath.auth.signup, body)
}

export const refreshAccessToken = (refreshToken) => {
  const body = JSON.stringify({ refresh_token: refreshToken })

  return axios.post(apiPath.auth.refresh, body)
}
