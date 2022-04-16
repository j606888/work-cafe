import {
  Stack,
  Avatar,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import { useContext } from "react"
import UserLayout from "../components/layout/UserLayout"
import AuthContext from "../context/AuthContext"

const ProfilePage = () => {
  const { user } = useContext(AuthContext)

  return (
    <UserLayout mt={5} >
        {user ? (
          <Paper elevation={5} sx={{ p: 3, mt: 5 }}>
            <Stack alignItems="center">
              <Avatar
                sx={{
                  bgcolor: blue[500],
                  width: 56,
                  height: 56,
                  fontSize: 36,
                  mb: 2,
                }}
              >
                {user.email[0].toUpperCase()}
              </Avatar>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="h6">{user.email}</Typography>
            </Stack>
          </Paper>
        ) : (
          <Stack alignItems="center" mt={10}>
            <CircularProgress />
          </Stack>
        )}
    </UserLayout>
  )
}

export default ProfilePage