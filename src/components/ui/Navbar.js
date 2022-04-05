import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link as RouterLink } from "react-router-dom"

function Navbar() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Work Cafe
        </Typography>
        <Button color="inherit" component={RouterLink} to="/login">
          LOGIN
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
