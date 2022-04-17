import apiPath from "../config/apiPath"
import authAxios from "./axios/authAxios"

export const getAllStores = () => {
  return authAxios.get(apiPath.stores.getAllStores)
}

export const getStore = (id) => {
  const basePath = apiPath.stores.getStore
  const path = basePath.replace(":id", id)

  // not really need auth
  return authAxios.get(path)
}
