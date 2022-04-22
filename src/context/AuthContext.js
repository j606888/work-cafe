import { createContext, useState, useEffect } from "react"
import { getInfo } from "../apis/user"

const AuthContext = createContext({
  loginUser: () => {},
  logoutUser: () => {},
  user: "",
  isLogin: false,
})

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken) {
      loginUser({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    }
  }, [])

  const loginUser = async ({ access_token, refresh_token }) => {
    localStorage.setItem("accessToken", access_token)
    localStorage.setItem("refreshToken", refresh_token)

    const res = await getInfo()
    const { id, email, name, role } = res.data
    setUser({ id, email, name, role })
    setIsLogin(true)
  }

  const logoutUser = () => {
    setUser(null)
    setIsLogin(false)
    localStorage.clear()
    window.location.replace('/login')
  }

  let contextData = {
    loginUser,
    logoutUser,
    user,
    isLogin,
  }
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
