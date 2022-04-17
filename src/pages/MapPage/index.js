import { Stack } from "@mui/material"
import UserLayout from "../../components/layout/UserLayout"
import { Wrapper } from "@googlemaps/react-wrapper"
import { useRef, useState } from "react"
import StoreDrawer from "./StoreDrawer"
import useGoogleMap from "./useGoogleMap"
import useMarkers from "./useMarkers"

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
const style = {
  stack: { height: "100vh" },
}

const MapPage = () => {
  const [storeId, setStoreId] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref)

  useMarkers(map, setStoreId)

  return (
    <UserLayout>
      <Stack sx={style.stack}>
        <Wrapper apiKey={API_KEY}>
          <StoreDrawer id={storeId} setStoreId={setStoreId} />
          <div style={{ height: "10px" }} />
          <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
        </Wrapper>
      </Stack>
    </UserLayout>
  )
}

export default MapPage
