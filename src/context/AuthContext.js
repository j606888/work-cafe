import { createContext, useState, useEffect } from "react"
import { getInfo } from "../apis/user"

const AuthContext = createContext({
  loginUser: () => {},
  logoutUser: () => {},
  user: "",
  isLoading: false,
})

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken) {
      loginUser({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const loginUser = async ({ access_token, refresh_token }) => {
    localStorage.setItem("accessToken", access_token)
    localStorage.setItem("refreshToken", refresh_token)

    const res = await getInfo()
    const { id, email, name, role } = res.data
    setUser({ id, email, name, role })
    setIsLoading(false)
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.clear()
  }

  let contextData = {
    loginUser,
    logoutUser,
    user,
    isLoading,
  }
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
