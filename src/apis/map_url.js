import authAxios from "./axios/authAxios"
import apiPath from "../config/apiPath"

export const createMapUrl = (url) => {
  const body = { url }

  return authAxios.post(apiPath.mapUrl.createMapUrl, body)
}

export const getAllMapUrls = ({ page, per, status }) => {
  const params = {
    page,
    per,
    status,
  }
  return authAxios.get(apiPath.mapUrl.getAllMapUrls, { params })
}
