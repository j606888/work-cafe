import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { API_HOST } from "../../config"
import { refreshAccessToken } from "../auth" 

const authAxios = axios.create({
  baseURL: API_HOST,
})

authAxios.defaults.baseURL = API_HOST
authAxios.defaults.headers.post["Content-Type"] = "application/json"

authAxios.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("accessToken")
  if (!accessToken) return req

  req.headers.Authorization = `Bearer ${accessToken}`

  const user = jwt_decode(accessToken)
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
  if (!isExpired) return req

  const refreshToken = localStorage.getItem("refreshToken")
  const response = await refreshAccessToken(refreshToken)

  const { access_token, refresh_token } = response.data
  localStorage.setItem("accessToken", access_token)
  localStorage.setItem("refreshToken", refresh_token)
  req.headers.Authorization = `Bearer ${access_token}`

  return req
})

export default authAxios
