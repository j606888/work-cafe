import "./App.css"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import HomePage from "./pages/HomePage"
import GoogleMap from "./pages/GoogleMap"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/google-map" element={<GoogleMap />}></Route>
      </Routes>
    </div>
  )
}

export default App
