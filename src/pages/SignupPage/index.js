import Button from "@mui/material/Button"
import {
  Avatar,
  Alert,
  Box,
  Link,
  Typography,
  Stack,
  Paper,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import TextInput from "../../components/input/TextInput"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useState, useContext } from "react"
import { useFormik } from "formik"
import { signup } from "../../apis/auth"
import { LoginSchema } from "../../helper/schema"
import UserLayout from "../../components/layout/UserLayout"
import AuthContext from "../../context/AuthContext"

const SignupPage = () => {
  const navigate = useNavigate()
  const { loginUser } = useContext(AuthContext)
  const [errorCode, setErrorCode] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setErrorCode(null)

      try {
        const res = await signup(values)
        const { access_token, refresh_token } = res.data
        loginUser({ access_token, refresh_token })
        navigate("/profile")
      } catch(error) {
        setErrorCode(error.response.status)
      }
    },
  })

  return (
    <UserLayout maxWidth="xs">
      <Paper elevation={3}>
        <Stack alignItems="center" mt={16} p={3}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: blue[800] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              註冊
            </Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            mt={1}
          >
            {errorCode === 409 && (
              <Alert severity="error">Email已被使用，請嘗試其他Email</Alert>
            )}
            {errorCode === 500 && (
              <Alert severity="error">發生了未知錯誤</Alert>
            )}
            <TextInput name="name" formik={formik} />
            <TextInput name="email" formik={formik} />
            <TextInput name="password" type="password" formik={formik} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              註冊
            </Button>
            <Link component={RouterLink} variant="body2" to="/login">
              已經有帳號？登入
            </Link>
          </Box>
        </Stack>
      </Paper>
    </UserLayout>
  )
}

export default SignupPage
