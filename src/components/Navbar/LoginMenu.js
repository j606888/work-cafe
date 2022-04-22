import IconButton from "@mui/material/IconButton"
import { AccountCircle } from "@mui/icons-material"
import { useState, useContext } from "react"
import { Menu, MenuItem } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const LoginMenu = ({ user }) => {
  const { logoutUser } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const isAdmin = user.role && user.role === 'admin'

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
        {isAdmin && (
          <MenuItem component={RouterLink} to="/admin/map-urls">
            管理者模式
          </MenuItem>
        )}

        <MenuItem onClick={() => logoutUser()}>登出</MenuItem>
      </Menu>
    </>
  )
}

export default LoginMenu
