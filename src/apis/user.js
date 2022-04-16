import apiPath from "../constants/apiPath"
import axiosInstance from "."

export const me = () => {
  return axiosInstance.get(apiPath.user.me)
}
