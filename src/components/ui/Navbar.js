import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import { Link as RouterLink } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import AuthContext from "../../context/AuthContext"

function Navbar() {
  const { logoutUser } = useContext(AuthContext)
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
        <Typography variant="h6">Work Cafe</Typography>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Button
            sx={{ color: "white", display: "block" }}
            component={RouterLink}
            to="/stores"
          >
            所有店家
          </Button>
          <Button
            sx={{ color: "white", display: "block" }}
            component={RouterLink}
            to="/new-store"
          >
            新增店家
          </Button>
        </Box>
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
