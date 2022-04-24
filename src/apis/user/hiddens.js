import authAxios from "../axios/authAxios"
import apiPath from "../../config/apiPath"

export const getAllHiddenStores = ({ page, per }) => {
  const params = {
    page,
    per,
  }

  return authAxios.get(apiPath.user.hiddens.getAllHiddenStores, { params })
}

export const createHidden = (id) => {
  const body = {
    store_id: id,
  }

  return authAxios.post(apiPath.user.hiddens.createHidden, body)
}
