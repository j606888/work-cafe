import { useRef, useState } from "react"
import useMarkers from "./useMarkers"
import useGoogleMap from "./useGoogleMap"
import StoreDrawer from "./StoreDrawer"

function MapComponent() {
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  const markerObjs = useMarkers(map, setMapCrawlerId)

  function removeMarker(id) {
    const targetMarker = markerObjs.find(markerObj => markerObj.id === id)
    targetMarker.marker.setMap(null)
  }

  return (
    <>
      <StoreDrawer
        id={mapCrawlerId}
        setMapCrawlerId={setMapCrawlerId}
        removeMarker={removeMarker}
      />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
