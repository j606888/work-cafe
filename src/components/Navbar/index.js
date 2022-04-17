import { useState, useEffect } from "react"
import { LocalCafe } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import LoginMenu from "./LoginMenu"
import { Link as RouterLink } from "react-router-dom"
import NavLinks from "./NavLinks"


const NAVS = [
  ['地圖', '/map'],
  ['店家', '/stores'],
  ['新增店家', '/stores/new'],
  ['審核', '/admin/map-urls']
]

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setIsLogin(true)
    }
  }, [])

  return (
    <AppBar>
      <Toolbar>
        <LocalCafe sx={{ mr: 2 }} />
        <Typography variant="h6" mr={3}>
          Work Cafe
        </Typography>
        <NavLinks navs={NAVS} />
        {isLogin && <LoginMenu />}
        {!isLogin && (
          <Button color="inherit" component={RouterLink} to="/login">
            LOGIN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
