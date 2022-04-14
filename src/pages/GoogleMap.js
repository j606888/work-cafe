import { Stack } from "@mui/material"
import MapWrapper from "../components/google-map/MapWrapper"
import UserLayout from "../components/layout/UserLayout"

const GoogleMap = () => {
  return (
    <UserLayout maxWidth="none">
      <Stack
        direction="column"
        sx={{
          height: "100vh",
        }}
      >
        <MapWrapper />
      </Stack>
    </UserLayout>
  )
}

export default GoogleMap
