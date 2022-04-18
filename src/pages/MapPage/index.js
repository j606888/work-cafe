import { Stack } from "@mui/material"
import UserLayout from "../../components/layout/UserLayout"
import { Wrapper } from "@googlemaps/react-wrapper"
import MapComponent from "./MapComponent"

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
const style = {
  stack: { height: "100vh" },
}

const MapPage = () => {
  return (
    <UserLayout>
      <Stack sx={style.stack}>
        <Wrapper apiKey={API_KEY}>
          <MapComponent />
        </Wrapper>
      </Stack>
    </UserLayout>
  )
}

export default MapPage
