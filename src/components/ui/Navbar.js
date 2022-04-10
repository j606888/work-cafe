import { AppBar, Toolbar, Typography, Button} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import LocalCafeIcon from "@material-ui/icons/LocalCafe"
import { Link as RouterLink } from "react-router-dom"
import { useState, useEffect } from 'react'

function Navbar() {
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
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setIsLogin(false)
  }
  
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <LocalCafeIcon style={{ marginRight: 10 }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Work Cafe
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
