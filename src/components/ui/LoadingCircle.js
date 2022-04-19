import { CircularProgress } from "@mui/material"
import { Box } from "@mui/material"

export default function LoadingCircle() {
  return <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <CircularProgress />
  </Box>
}
