import { useRef, useState } from "react"
import useMarkers from "./useMarkers"
import useGoogleMap from "./useGoogleMap"
import StoreDrawer from "./StoreDrawer"
import CrawlBoard from "./CrawlBoard"

function MapComponent() {
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const [location, setLocation] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref, openBoard)
  const [markerObjs, getStores] = useMarkers(map, setMapCrawlerId)

  function openBoard(lat, lng) {
    setLocation(`${lat},${lng}`)
  }

  function removeMarker(id) {
    const targetMarker = markerObjs.find(markerObj => markerObj.id === id)
    targetMarker.marker.setMap(null)
  }

  function handleRefresh() {
    // console.log("WOOOO")
    // markerObjs.forEach(markerObj => {
    //   markerObj.marker.setMap(null)
    // })

    getStores()
  }

  return (
    <>
      <StoreDrawer
        id={mapCrawlerId}
        setMapCrawlerId={setMapCrawlerId}
        removeMarker={removeMarker}
      />
      <CrawlBoard location={location} refreshMap={handleRefresh} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
