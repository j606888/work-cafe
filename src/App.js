import "./App.css"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  )
}

export default App
