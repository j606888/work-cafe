import authAxios from "./axios/authAxios"
import apiPath from "../config/apiPath"

export const createMapUrl = (url) => {
  const body = { url }

  return authAxios.post(apiPath.mapUrl.createMapUrl, body)
}

export const getAllMapUrls = (page, per) => {
  const params = {
    page,
    per,
  }
  return authAxios.get(apiPath.mapUrl.getAllMapUrls, { params })
}
