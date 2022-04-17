import apiPath from "../config/apiPath"
import authAxios from "./axios/authAxios"

export const getInfo = () => {
  return authAxios.get(apiPath.user.getInfo)
}
