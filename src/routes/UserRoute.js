import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function UserRoute() {
  const { isLogin } = useContext(AuthContext)
  console.log("isLogin,", isLogin)

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
