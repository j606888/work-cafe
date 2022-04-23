const apiPath = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/auth/refresh",
  },
  user: {
    getInfo: "/user/me",
    stores: {
      getAllFavoriteStores: "/user/stores/favorites",
      toggleFavoriteStore: "/user/stores/:id/toggle-favorite",
    },
  },
  stores: {
    getAllStores: "/stores",
    getStore: "/stores/:id",
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
      getMapCrawler: "/admin/map_crawlers/:id",
      getAllMapCrawlers: "/admin/map_crawlers",
      bindMapCrawler: "/admin/map_crawlers/:id/bind",
      denyMapCrawler: "/admin/map_crawlers/:id/deny",
      search: "/admin/map_crawlers/search",
    },
  },
}


export default apiPath
