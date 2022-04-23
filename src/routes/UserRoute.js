import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function UserRoute() {
  const { isLoading, user } = useContext(AuthContext)

  if (isLoading) {
    return <h1>isLoading...</h1>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
