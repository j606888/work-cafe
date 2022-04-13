const apiPath = {
  auth: {
    register: "/api/v1/auth/register",
    login: "/auth/login",
    refresh: "/api/v1/auth/token",
  },
  user: {
    information: "/api/v1/users/me",
  },
  forms: {
    formList: "/api/v1/forms",
  },
  response: {
    responseList: "/api/v1/responses",
  },
}


export default apiPath
