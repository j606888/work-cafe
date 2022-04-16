import apiPath from "../config/apiPath"
import authAxios from "./axios/authAxios"

export const allStores = () => {
  return authAxios.get(apiPath.stores.allStores)
}

export const newStore = (url) => {
  const body = JSON.stringify({ url })

  return authAxios.post(apiPath.stores.newStore, body)
}
