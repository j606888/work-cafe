import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function UserRoute() {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <h1>isLoading...</h1>
  }

  if (user) {
    return <Outlet />
  }

  return <Navigate to="/login" replace />
}
