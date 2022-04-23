import { LocalCafe } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import LoginMenu from "./LoginMenu"
import { Link as RouterLink } from "react-router-dom"
import NavLinks from "./NavLinks"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

const NAVS = [
  ['地圖', '/map'],
  ['店家', '/stores'],
  ['新增店家', '/stores/new'],
]

const Navbar = () => {
  const { isLogin, user } = useContext(AuthContext)

  return (
    <AppBar>
      <Toolbar>
        <LocalCafe sx={{ mr: 2 }} />
        <Typography variant="h6" mr={3}>
          Work Cafe
        </Typography>
        <NavLinks navs={NAVS} />
        {isLogin && <LoginMenu user={user} />}
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
