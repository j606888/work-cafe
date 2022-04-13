import { HOST } from "../config"
import apiPath from "../constants/apiPath"
import * as axios from "axios"

export const login = (data) => {
  const body = JSON.stringify(data)

  return axios.post(apiPath.auth.login, body)
}
export const signup = (data) => {
  const body = JSON.stringify(data)

  return axios.post(apiPath.auth.signup, body)
}
