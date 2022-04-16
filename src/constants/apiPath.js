const apiPath = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/api/v1/auth/token",
  },
  user: {
    me: "/user/me",
  },
  stores: {
    allStores: "/stores",
    newStore: "/google_map/parse_place_id"
  }
}


export default apiPath
