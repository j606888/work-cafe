import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link as RouterLink } from "react-router-dom"

const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  }
  const avatarStyle = {
    backgroundColor: "#50be50",
  }
  const btnStyle = {
    margin: "16px 0",
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter name"
          fullWidth
          required
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          style={btnStyle}
        >
          SIGN UP
        </Button>
        <Typography>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Signup
