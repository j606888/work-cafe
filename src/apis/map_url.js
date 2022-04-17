import authAxios from "./axios/authAxios"
import apiPath from "../config/apiPath"

export const newMapUrl = (url) => {
  const body = { url }

  return authAxios.post(apiPath.mapUrl.newMapUrl, body)
}

export const listMapUrls = (page, per) => {
  const params = {
    page,
    per
  }
  return authAxios.get(apiPath.mapUrl.listMapUrls, { params })
}
