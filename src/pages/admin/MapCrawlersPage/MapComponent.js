import { useEffect, useRef, useState } from "react"
import useGoogleMap from "../../../hooks/useGoogleMap"
import useGoogleMarkers from "../../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import CrawlBoard from "./CrawlBoard"
import { getAllMapCrawlers } from "../../../apis/admin/map_crawlers"

function MapComponent() {
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const [location, setLocation] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref, openBoard)
  const [mapCrawlers, setMapCrawlers] = useState([])
  const markerObjs = useGoogleMarkers(map, mapCrawlers, setMapCrawlerId)

   async function getMapCrawlers() {
     const res = await getAllMapCrawlers({
       page: 1,
       per: 200,
       status: "created",
     })
     const { map_crawlers, paging } = res.data
     setMapCrawlers(map_crawlers)
   }

  useEffect(() => {
    getMapCrawlers()
  }, [])

  function openBoard(lat, lng) {
    setLocation(`${lat},${lng}`)
  }

  function removeMarker(id) {
    const targetMarker = markerObjs.find(markerObj => markerObj.id === id)
    targetMarker.marker.setMap(null)
  }

  function handleRefresh() {
    markerObjs.forEach(markerObj => {
      markerObj.marker.setMap(null)
    })
    setMapCrawlers([])
    getMapCrawlers()
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
