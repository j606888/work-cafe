import Button from "@mui/material/Button"
import {
  Avatar,
  Box,
  Container,
  Link,
  Typography,
  Stack,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import TextInput from "../components/input/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useState } from "react"
import { useFormik } from "formik"
import { signup } from "../apis/auth"
import { LoginSchema } from "../helper/schema"
import UserLayout from "../components/layout/UserLayout"

const SignupPage = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setErrorMessage()
      signup(values)
        .then((res) => {
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
    <UserLayout maxWidth="none">
      <Container component="main" maxWidth="xs">
        <Stack alignItems="center" mt={12}>
          <Avatar sx={{ m: 1, bgcolor: blue[800] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            mt={1}
          >
            <TextInput name="name" formik={formik} />
            <TextInput name="email" formik={formik} />
            <TextInput name="password" type="password" formik={formik} />

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
              Sign Up
            </Button>
            <Link component={RouterLink} variant="body2" to="/login">
              {"Already have account? Log in"}
            </Link>
          </Box>
        </Stack>
      </Container>
    </UserLayout>
  )
}

export default SignupPage
