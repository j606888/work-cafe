import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminRoute() {
  const { user } = useContext(AuthContext)

  if (user.role !== 'admin') {
    return <Navigate to="/stores" replace />
  }

  return <Outlet />
}
