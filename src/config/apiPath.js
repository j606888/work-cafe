const apiPath = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/auth/refresh",
  },
  user: {
    me: "/user/me",
  },
  stores: {
    allStores: "/stores",
    newStore: "/google_map/parse_place_id",
  },
  mapUrl: {
    newMapUrl: "/user/map_urls",
    listMapUrls: "/user/map_urls",
  },
  admin: {
    mapUrl: {
      listMapUrls: "/admin/map_urls",
      denyMapUrl: "/admin/map_urls/:id/deny",
      searchNearby: "/admin/map_urls/:id/nearbysearch",
      bindStore: "/admin/map_urls/:id/create-store",
    },
  },
}


export default apiPath
