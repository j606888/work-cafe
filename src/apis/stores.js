import apiPath from "../config/apiPath"
import authAxios from "./axios/authAxios"

export const getAllStores = ({ page, per, city, districts }) => {
  const params = { page, per, city, districts }
  return authAxios.get(apiPath.stores.getAllStores, {
    params
  })
}

export const getStore = (id) => {
  const basePath = apiPath.stores.getStore
  const path = basePath.replace(":id", id)

  // not really need auth
  return authAxios.get(path)
}
