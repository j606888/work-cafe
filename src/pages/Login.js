import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link as RouterLink } from "react-router-dom"

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "32px auto",
  }
  const avatarStyle = {
    backgroundColor: "#50be50",
  }
  const btnStyle = {
    margin: "8px 0",
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        <TextField label="Email" placeholder="Enter email" fullWidth required />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          style={btnStyle}
        >
          Log in
        </Button>
        <Typography>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography>
          Don't have an account?{" "}
          <Link component={RouterLink} to='/signup'>Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
