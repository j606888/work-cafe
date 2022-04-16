import authAxios from "./axios/authAxios"
import apiPath from "../config/apiPath"

export const newMapUrl = (url) => {
  const body = { url }

  return authAxios.post(apiPath.mapUrl.newMapUrl, body)
}
