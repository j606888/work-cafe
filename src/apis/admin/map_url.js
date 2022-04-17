import authAxios from "../axios/authAxios";
import apiPath from "../../config/apiPath";

export const getAllMapurls = ({state, page, per}) => {
  const params = {
    // state,
    page,
    per
  }

  // if (state !== null || state !== "") {
  //   params.state = state
  // }
  return authAxios.get(apiPath.admin.mapUrl.getAllMapurls, { params })
}

export const denyMapUrl = (id) => {
  const originalPath = apiPath.admin.mapUrl.denyMapUrl
  const path = originalPath.replace(":id", id)

  return authAxios.post(path)
}

export const searchNearby = (id) => {
  const originalPath = apiPath.admin.mapUrl.searchNearby
  const path = originalPath.replace(":id", id)

  return authAxios.post(path)
}

export const bindStore = ({id, placeId}) => {
  const originalPath = apiPath.admin.mapUrl.bindStore
  const path = originalPath.replace(":id", id)
  const body = { place_id: placeId }

  return authAxios.post(path, body)
}
