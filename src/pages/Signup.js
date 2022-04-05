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
import { useFormik } from "formik"
import * as yup from "yup"
import { v4 as uuidv4 } from 'uuid'
import Api from "../helper/api"

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
      const data = {
        id: uuidv4(),
        ...values
      }
      api
        .signup(data)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    },
  })
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={formik.handleSubmit}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
        </form>
      </Paper>
    </Grid>
  )
}

export default Signup
