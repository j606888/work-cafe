import axios from "axios"
import { HOST } from "../config"
import jwt_decode from 'jwt-decode'
import dayjs from "dayjs"

const axiosInstance = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  async (req) => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) return req
  
    req.headers.Authorization = `Bearer ${accessToken}`

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) return req

    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.post(`${HOST}/auth/refresh`, {
      refresh_token: refreshToken,
    })

    const { access_token, refresh_token } = response.data
    localStorage.setItem("accessToken", access_token)
    localStorage.setItem("refreshToken", refresh_token)
    req.headers.Authorization = `Bearer ${access_token}`

    return req
  }
)

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error.response)
//     if (
//       error.response.status === 409 &&
//       error.response.data.reason === "Signature has expired"
//     ) {
//       const refreshToken = localStorage.getItem('refreshToken')
//       if (!refreshToken) {
        
//       }
//     }
//     if (error.response.status === 401) {
//       // window.location.href = '/login'
//     }
//   }
// )

export default axiosInstance
