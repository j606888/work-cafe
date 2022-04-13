import { HOST } from "../config"
import apiPath from "../constants/apiPath"
import * as axios from "axios"

export const login = (data) => {
  console.log(HOST)
  const body = JSON.stringify(data)
  const headers = {
    "Content-Type": "application/json",
  }
  console.log(apiPath.auth.login)

  return axios.post(`${HOST}${apiPath.auth.login}`, body, { headers: headers })
}
