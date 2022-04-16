import apiPath from "../config/apiPath"
import customAxios from "."


export const allStores = () => {
  return customAxios.get(apiPath.stores.allStores)
}

export const newStore = (url) => {
  const body = JSON.stringify({ url })

  return customAxios.post(apiPath.stores.newStore, body)
}
