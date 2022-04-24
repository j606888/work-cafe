import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminRoute() {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <h1>Initing...</h1>
  }

  if (user && user.role === 'admin') {
    return <Outlet />
  }

  return <Navigate to="/stores" replace />
}
