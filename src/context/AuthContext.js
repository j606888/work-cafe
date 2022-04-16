import { createContext, useState } from "react"
import { me } from "../apis/user"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(null)
  let [user, setUser] = useState(null)

  const loginUser = async ({ access_token, refresh_token }) => {
    setAuthTokens({ accessToken: access_token, refreshToken: refresh_token })

    localStorage.setItem("accessToken", access_token)
    localStorage.setItem("refreshToken", refresh_token)

    const res = await me()
    const { id, email, name } = res.data
    setUser({ id, email, name })
  }

  let contextData = {
    loginUser,
    user,
    authTokens,
  }
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
