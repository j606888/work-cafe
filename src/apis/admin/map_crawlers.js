import authAxios from "../axios/authAxios"
import apiPath from "../../config/apiPath"

export const getAllMapCrawlers = ({ status, page, per }) => {
  const params = {
    status,
    page,
    per,
  }

  return authAxios.get(apiPath.admin.mapCralwers.getAllMapCrawlers, { params })
}
