import authAxios from "../axios/authAxios"
import apiPath from "../../config/apiPath"

export const getAllFavoriteStores = ({ page, per }) => {
  const params = {
    page,
    per,
  }

  return authAxios.get(apiPath.user.favorites.getAllFavoriteStores, { params })
}

export const toggleFavorite = (id) => {
  const body = {
    store_id: id
  }

  return authAxios.post(apiPath.user.favorites.toggleFavorite, body)
}
