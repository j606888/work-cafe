import { AuthProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import MapPage from "./pages/MapPage"
import SearchGoogleMapUrl from "./pages/SearchGoogleMapUrl"
import StoresPage from "./pages/StoresPage"
import NewStore from "./pages/StoresPage/new-store"
import PrivateRoute from "./pages/PrivateRoute"
import MapUrlsIndex from "./pages/admin/map-urls"
import "./apis/axios"

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="new-store" element={<NewStore />} />
          <Route path="admin/map-urls" element={<MapUrlsIndex />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route
          path="/search-google-map-url"
          element={<SearchGoogleMapUrl />}
        ></Route>{" "}
      </Routes>
    </AuthProvider>
  )
}

export default App
