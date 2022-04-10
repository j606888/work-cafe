import {
  Avatar,
  Grid,
  Paper,
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
import { useState } from "react"
import Alert from "../components/ui/alert"
import TextInput from "../components/input/TextInput"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
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

  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setErrorMessage()
      setLoginSuccess(false)
      setLoginFailed(false)

      api.login(values).then((res) => {
        const { access_token, refresh_token } = res.data
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem("refreshToken", refresh_token)

        navigate('/profile')
      }).catch(error => {
        const reason = error.response.data.reason

        setErrorMessage(reason)
      })
    }
  })

  const getMe = () => {
    api.me().then((res) => {
      const result = res.data
      console.log(result)
    })
  }
  return (
    <Grid>
      <button onClick={getMe}>Me</button>
      {loginSuccess && <Alert message="Login Success!" />}
      {loginFailed && <Alert message="Login Failed!" type="error" />}
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={formik.handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <TextInput name="email" formik={formik} />
          <TextInput name="password" type="password" formik={formik} />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          {errorMessage && (
            <Typography style={{ color: "red", textAlign: "center" }}>
              {errorMessage}
            </Typography>
          )}
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
