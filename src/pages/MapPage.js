import { Stack } from "@mui/material"
import UserLayout from "../components/layout/UserLayout"
import { Wrapper } from "@googlemaps/react-wrapper"
import Map from '../feature/Map'


const MapPage = () => {
  return (
    <UserLayout maxWidth="none">
      <Stack
        sx={{
          height: "100vh",
        }}
      >
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
          <Map />
        </Wrapper>
      </Stack>
    </UserLayout>
  )
}

export default MapPage
