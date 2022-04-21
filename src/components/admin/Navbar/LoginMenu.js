import IconButton from "@mui/material/IconButton"
import { AccountCircle } from "@mui/icons-material"
import { useState, useContext } from "react"
import { Menu, MenuItem } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthContext from "../../../context/AuthContext"

const LoginMenu = () => {
  const { logoutUser } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <>
      <IconButton
        color="inherit"
        aria-controls="use-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem component={RouterLink} to="/profile">
          設定
        </MenuItem>
        <MenuItem component={RouterLink} to="/stores">
          一般用戶
        </MenuItem>
        <MenuItem onClick={() => logoutUser()}>登出</MenuItem>
      </Menu>
    </>
  )
}

export default LoginMenu
