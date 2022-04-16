import { AuthProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import Map from "./pages/Map"
import SearchGoogleMapUrl from "./pages/SearchGoogleMapUrl"
import PrivateRoute from "./pages/PrivateRoute"
import "./apis/axios"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route
          path="/search-google-map-url"
          element={<SearchGoogleMapUrl />}
        ></Route>{" "}
        */
        {/* <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route> */}
      </Routes>
    </AuthProvider>
  )
}

export default App
