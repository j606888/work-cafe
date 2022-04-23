import authAxios from "../axios/authAxios"
import apiPath from "../../config/apiPath"

export const getAllFavoriteStores = ({ page, per }) => {
  const params = {
    page,
    per,
  }

  return authAxios.get(apiPath.user.stores.getAllFavoriteStores, { params })
}

export const toggleFavorite = (id) => {
  const originalPath = apiPath.user.stores.toggleFavoriteStore
  const path = originalPath.replace(":id", id)

  return authAxios.post(path)
}
