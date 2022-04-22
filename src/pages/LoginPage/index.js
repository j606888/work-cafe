import {
  Avatar,
  Alert,
  Button,
  Box,
  Grid,
  Link,
  Typography,
  Stack,
  Paper,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { useState, useContext } from "react"
import { useFormik } from "formik"
import { login } from "../../apis/auth"
import TextInput from "../../components/input/TextInput"
import { LoginSchema } from "../../helper/schema"
import AuthContext from "../../context/AuthContext"
import UserLayout from "../../components/layout/UserLayout"

const Login = () => {
  const navigate = useNavigate()
  const { loginUser } = useContext(AuthContext)
  const [errorCode, setErrorCode] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setErrorCode(null)

      try {
        const res = await login(values)
        const { access_token, refresh_token } = res.data
        await loginUser({ access_token, refresh_token })
        navigate("/profile")
      } catch (error) {
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
              登入
            </Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            mt={1}
          >
            {errorCode === 400 && (
              <Alert severity="error">帳號或密碼錯誤，請重試</Alert>
            )}
            {errorCode === 500 && (
              <Alert severity="error">發生了未知錯誤</Alert>
            )}
            <TextInput name="email" formik={formik} />
            <TextInput name="password" type="password" formik={formik} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              登入
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘記密碼
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} variant="body2" to="/signup">
                  {"建立帳號"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </UserLayout>
  )
}

export default Login
