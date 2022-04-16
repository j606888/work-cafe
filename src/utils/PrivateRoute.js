import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ children }) => {
  const authenticated = true

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
