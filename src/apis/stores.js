import apiPath from "../constants/apiPath"
import axios from "axios"

export const allStores = () => {
  return axios.get(apiPath.stores.allStores)
}
