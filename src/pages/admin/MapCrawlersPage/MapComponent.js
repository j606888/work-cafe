import { useRef, useState } from "react"
import useMarkers from "./useMarkers"
import useGoogleMap from "./useGoogleMap"
import StoreDrawer from "./StoreDrawer"

function MapComponent() {
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  useMarkers(map, setMapCrawlerId)

  return (
    <>
      <StoreDrawer id={mapCrawlerId} setMapCrawlerId={setMapCrawlerId} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
