import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function UserRoute() {
  const { isLogin, isInit } = useContext(AuthContext)

  if (!isInit) {
    return <h1>Initing...</h1>
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
