import IconButton from "@mui/material/IconButton"
import { AccountCircle } from "@mui/icons-material"
import { useState, useContext } from "react"
import { Menu, MenuItem } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const LoginMenu = () => {
  const { logoutUser } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)

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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default LoginMenu
