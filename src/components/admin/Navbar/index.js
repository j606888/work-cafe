import { useState, useEffect } from "react"
import { LocalCafe } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import LoginMenu from "./LoginMenu"
import { Link as RouterLink } from "react-router-dom"
import NavLinks from "./NavLinks"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { purple } from "@mui/material/colors"

const NAVS = [
  ["審核", "/admin/map-urls"],
  ["爬蟲", "/admin/map-crawlers"],
]

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#11cb5f'
    }
  }
})

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setIsLogin(true)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <LocalCafe sx={{ mr: 2 }} />
          <Typography variant="h6" mr={3}>
            Work Cafe (Admin)
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
    </ThemeProvider>
  )
}

export default Navbar
