import "./apis/axios"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import StoresPage from "./pages/StoresPage"
import NewStore from "./pages/StoresPage/new-store"
import PrivateRoute from "./pages/PrivateRoute"
import MapUrlsIndex from "./pages/admin/map-urls"
import {
  HomePage,
  Login,
  SignupPage,
  ProfilePage,
  MapPage
} from './pages'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="new-store" element={<NewStore />} />
          <Route path="admin/map-urls" element={<MapUrlsIndex />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
