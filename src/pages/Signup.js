import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Link,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import Api from "../helper/api"
import Alert from "../components/ui/alert"
import { useState } from "react"
import TextInput from "../components/input/TextInput"

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password must greater than 6")
    .required("Password is required"),
})

const Signup = () => {
  const navigate = useNavigate()
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupFailed, setSignupFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const api = new Api()
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSignupSuccess(false)
      setSignupFailed(false)

      const data = {
        ...values
      }
      api
        .signup(data)
        .then((res) => {
          const { access_token, refresh_token } = res.data
          localStorage.setItem("accessToken", access_token)
          localStorage.setItem("refreshToken", refresh_token)

          navigate("/profile")
        })
        .catch((error) => {
          const reason = error.response.data.reason

          setErrorMessage(reason)
        })
    },
  })
  return (
    <Grid>
      {signupSuccess && <Alert message="Signup Success!" />}
      {signupFailed && <Alert message="Signup Failed!" type="error" />}
      <Paper elevation={4} style={paperStyle}>
        <form onSubmit={formik.handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextInput name="name" formik={formik} />
          <TextInput name="email" formik={formik} />
          <TextInput name="password" type="password" formik={formik} />
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
            SIGN UP
          </Button>
          <Typography>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  )
}

export default Signup
