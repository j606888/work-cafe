import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import { Link as RouterLink } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import AuthContext from "../../context/AuthContext"

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLogin(true)
    }
  }, [])

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logoutUser()
  }
  
  return (
    <AppBar>
      <Toolbar>
        <LocalCafeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Work Cafe
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hello, {user && user.email}
        </Typography>
        {isLogin && (
          <>
            <IconButton
              color="inherit"
              aria-controls="use-menu"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem component={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem component={RouterLink} to="/search-google-map-url">
                Search GoogleMap
              </MenuItem>
              <MenuItem component={RouterLink} to="/google-map">
                Show GoogleMap
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
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
