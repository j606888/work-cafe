import "./apis/axios"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { FavoriteProvider } from "./context/FavoriteContext"
import { HiddenProvider } from "./context/HiddenContext"
import StoresPage from "./pages/StoresPage"
import AdminRoute from "./routes/AdminRoute"
import UserRoute from "./routes/UserRoute"
import {
  HomePage,
  LoginPage,
  SignupPage,
  ProfilePage,
  MapPage,
  NewStorePage,
} from "./pages"
import {
  AdminMapCrawlersPage,
  AdminMapUrlsPage
}from './pages/admin'

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <HiddenProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route element={<UserRoute />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="stores/new" element={<NewStorePage />} />
              </Route>
              <Route path="admin" element={<AdminRoute />}>
                <Route path="map-urls" element={<AdminMapUrlsPage />} />
                <Route path="map-crawlers" element={<AdminMapCrawlersPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HiddenProvider>
      </FavoriteProvider>
    </AuthProvider>
  )
}

export default App
