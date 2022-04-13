import "./App.css"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
// import Profile from "./pages/Profile"
// import HomePage from "./pages/HomePage"
// import GoogleMap from "./pages/GoogleMap"
// import SearchGoogleMapUrl from "./pages/SearchGoogleMapUrl"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/google-map" element={<GoogleMap />}></Route>
        <Route path="/search-google-map-url" element={<SearchGoogleMapUrl />}></Route> */}
      </Routes>
    </div>
  )
}

export default App
