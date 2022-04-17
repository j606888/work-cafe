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
  Stack,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import TextInput from "../components/input/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useState, useContext } from "react"
import { useFormik } from "formik"
import { login } from "../apis/auth"
import { LoginSchema } from "../helper/schema" 
import AuthContext from "../context/AuthContext"
import UserLayout from '../components/layout/UserLayout'

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setErrorMessage()
      login(values)
        .then((res) => {
          const { access_token, refresh_token } = res.data
          loginUser({ access_token, refresh_token })
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
    <UserLayout maxWidth="none">
      <Container component="main" maxWidth="xs">
        <Stack alignItems="center" mt={12}>
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
            mt={1}
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
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default LoginPage
