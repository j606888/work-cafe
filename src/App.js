import "./apis/axios"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import StoresPage from "./pages/StoresPage"
import PrivateRoute from "./pages/PrivateRoute"
import MapUrlsIndex from "./pages/admin/map-urls"
import {
  HomePage,
  LoginPage,
  SignupPage,
  ProfilePage,
  MapPage,
  NewStorePage
} from './pages'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="stores/new" element={<NewStorePage />} />
          <Route path="admin/map-urls" element={<MapUrlsIndex />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
