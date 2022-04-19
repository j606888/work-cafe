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

export const getMapCralwer = (id) => {
  const originalPath = apiPath.admin.mapCralwers.getMapCrawler
  const path = originalPath.replace(":id", id)

  return authAxios.get(path)
}

export const bindMapCrawler = (id) => {
  const originalPath = apiPath.admin.mapCralwers.bindMapCrawler
  const path = originalPath.replace(":id", id)

  return authAxios.post(path)
}

export const denyMapCrawler = (id) => {
  const originalPath = apiPath.admin.mapCralwers.denyMapCrawler
  const path = originalPath.replace(":id", id)

  return authAxios.post(path)
}

export const search = (location) => {
  const path = apiPath.admin.mapCralwers.search
  const body = { location }

  return authAxios.post(path, body)
}
