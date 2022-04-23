import {
  Stack,
  Avatar,
  Typography,
  Paper,
} from "@mui/material"
import { blue } from "@mui/material/colors"

export default function UserInfo({ user }) {
  return (
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
  )
}
