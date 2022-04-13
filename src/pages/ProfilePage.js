import {
  Container,
  Stack,
  Avatar,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { me } from "../apis/user"

const ProfilePage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    me()
      .then((res) => {
        const { id, email, name } = res.data
        setUser({ id, email, name })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <Container maxWidth="sm">
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
          <CircularProgress/>
        </Stack>
      )}
    </Container>
  )
}

export default ProfilePage
