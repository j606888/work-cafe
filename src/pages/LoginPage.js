import Button from "@mui/material/Button"
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Typography,
  Checkbox,
} from "@mui/material"
import * as yup from "yup"
import { blue } from "@mui/material/colors"
import TextInput from "../components/input/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useState } from "react"
import { useFormik } from "formik"
import { login } from "../apis/auth"

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password must greater than 6")
    .required("Password is required"),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setErrorMessage()
      console.log("HI")
      login(values)
        .then((res) => {
          console.log("THIS IS RES")
          console.log(res)
          const { access_token, refresh_token } = res.data
          localStorage.setItem("accessToken", access_token)
          localStorage.setItem("refreshToken", refresh_token)

          navigate("/profile")
        })
        .catch((error) => {
          console.log(error)
          const reason = error.response.data.reason

          setErrorMessage(reason)
        })
    },
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: blue[800] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextInput name="email" formik={formik} />
          <TextInput name="password" type="password" formik={formik} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {errorMessage && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
