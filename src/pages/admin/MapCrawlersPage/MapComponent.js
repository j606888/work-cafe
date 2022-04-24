import { useEffect, useRef, useState } from "react"
import useGoogleMap from "../../../hooks/useGoogleMap"
import useGoogleMarkers from "../../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import CrawlBoard from "./CrawlBoard"
import { getAllMapCrawlers } from "../../../apis/admin/map_crawlers"
import useGoogleCluster from "../../../hooks/useGoogleCluster"
import useGoogleMarkerCrawledLabel from "../../../hooks/useGoogleMarkerCrawledLabel"

function MapComponent() {
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const [location, setLocation] = useState(null)
  const [mapCrawlers, setMapCrawlers] = useState([])
  const ref = useRef(null)
  const map = useGoogleMap({ ref, handleOnClick: openBoard })
  const { markerIsLoaded, setMarkerIsLoaded } = useGoogleMarkers({
    map,
    items: mapCrawlers,
    setItems: setMapCrawlers,
    setItemId: setMapCrawlerId,
  })
  useGoogleMarkerCrawledLabel({ items: mapCrawlers })
  useGoogleCluster({ map, items: mapCrawlers, isLoaded: markerIsLoaded })

  async function getMapCrawlers() {
    const res = await getAllMapCrawlers({
      page: 1,
      per: 500,
    })
    const { map_crawlers, paging } = res.data
    setMapCrawlers([...map_crawlers])
  }

  useEffect(() => {
    getMapCrawlers()
  }, [])

  useEffect(() => {
    console.log("I am changed")
  }, [mapCrawlers])

  function openBoard(lat, lng) {
    setLocation(`${lat},${lng}`)
  }

  function removeMarker(id) {
    const mapCrawler = mapCrawlers.find((mc) => mc.id === id)
    mapCrawler.marker.setMap(null)
    mapCrawler.hidden = true
    setMapCrawlers([...mapCrawlers])
  }

  function handleRefresh() {
    mapCrawlers.forEach((mapCrawler) => {
      mapCrawler.marker.setMap(null)
    })
    setMapCrawlers([])
    setMarkerIsLoaded(false)
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
