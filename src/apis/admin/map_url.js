import authAxios from "../axios/authAxios";
import apiPath from "../../config/apiPath";

export const listmapUrls = ({state, page, per}) => {
  const params = {
    state,
    page,
    per
  }
  return authAxios.get(apiPath.admin.mapUrl.listMapUrls, { params })
}
