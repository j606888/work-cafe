import apiPath from "../constants/apiPath"
import * as axios from "axios"

export const me = () => {
  return axios.get(apiPath.user.me)
}
