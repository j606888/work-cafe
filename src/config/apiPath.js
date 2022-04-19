const apiPath = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/auth/refresh",
  },
  user: {
    getInfo: "/user/me",
  },
  stores: {
    getAllStores: "/stores",
    getStore: "/stores/:id"
  },
  mapUrl: {
    createMapUrl: "/user/map_urls",
    getAllMapUrls: "/user/map_urls",
  },
  admin: {
    mapUrl: {
      getAllMapurls: "/admin/map_urls",
      denyMapUrl: "/admin/map_urls/:id/deny",
      searchNearby: "/admin/map_urls/:id/nearbysearch",
      bindStore: "/admin/map_urls/:id/create-store",
    },
    mapCralwers: {
      getAllMapCrawlers: "/admin/map_crawlers"
    } 
  },
}


export default apiPath
