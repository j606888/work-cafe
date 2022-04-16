import apiPath from "../constants/apiPath"
import customAxios from "."

export const login = (data) => {
  const body = JSON.stringify(data)

  return customAxios.post(apiPath.auth.login, body)
}

export const signup = (data) => {
  const body = JSON.stringify(data)

  return customAxios.post(apiPath.auth.signup, body)
}

export const refreshAccessToken = (refreshToken) => {
  const body = JSON.stringify({ refresh_token: refreshToken })

  return customAxios.post(apiPath.auth.refresh, body)
}
