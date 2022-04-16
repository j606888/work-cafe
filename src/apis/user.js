import apiPath from "../config/apiPath"
import authAxios from "./axios/authAxios"

export const me = () => {
  return authAxios.get(apiPath.user.me)
}
