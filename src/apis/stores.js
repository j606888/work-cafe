import apiPath from "../constants/apiPath"
import axios from "axios"

export const allStores = () => {
  return axios.get(apiPath.stores.allStores)
}

export const newStore = (url) => {
  const body = JSON.stringify({ url })

  return axios.post(apiPath.stores.newStore, body)
}
