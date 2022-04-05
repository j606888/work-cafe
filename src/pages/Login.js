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
import { useFormik } from "formik"
import * as yup from 'yup'
import Api from "../helper/api"

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password must greater than 6')
    .required('Password is required')
})

const Login = () => {
  const api = new Api()
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      api.getUsers().then(({data: users}) => {
        const user = users.find(u => u.email === values.email)
  
        if (user && user.password === values.password) {
          console.log('Login success!')
        } else {
          console.log('Login failed')
        }
      })
    }
  })
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={formik.handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
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
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  )
}

export default Login
