import { useCallback, useEffect, useRef, useState } from "react"
import useGoogleMap from "../../../hooks/useGoogleMap"
import useGoogleMarkers from "../../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import CrawlBoard from "./CrawlBoard"
import { getAllMapCrawlers } from "../../../apis/admin/map_crawlers"
import useGoogleCluster from "../../../hooks/useGoogleCluster"
import useGoogleMarkerCrawledLabel from "../../../hooks/useGoogleMarkerCrawledLabel"
import { useSearchParams } from "react-router-dom"
import { Button } from "@mui/material"

function MapComponent() {
  const [searchParams] = useSearchParams()
  const [mapCrawlerId, setMapCrawlerId] = useState(null)
  const [location, setLocation] = useState(null)
  const [mapCrawlers, setMapCrawlers] = useState([])
  const markerOnClick = useCallback((id) => {
    console.log(`Marker with id ${id} was click`)
  }, [])
  const ref = useRef(null)

  // googleMap.addListener("click", (mapMouseEvent) => {
  //   const location = mapMouseEvent.latLng.toJSON()
  //   if (handleOnClick) {
  //     handleOnClick(location.lat, location.lng)
  //   }
  // })

  const openBoard = () => {
    console.log("I am click")
  }

  const map = useGoogleMap({ ref, onClick: openBoard })
  const markers = useGoogleMarkers({
    map,
    items: mapCrawlers,
    onClick: markerOnClick,
  })
  useGoogleMarkerCrawledLabel({ markers, items: mapCrawlers })

  const getMapCrawlers = useCallback(({ lat, lng }) => {
    async function doGetMapCrawlers() {
      
      const res = await getAllMapCrawlers({
        page: 1,
        per: 20,
        lat,
        lng,
        status: 'created'
      })
      // setMarkerIsLoaded(false)
      const { map_crawlers, paging } = res.data
      console.log(map_crawlers)
      setMapCrawlers(map_crawlers)
    }

    doGetMapCrawlers()
  }, [])

  // first time init
  useEffect(() => {
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    getMapCrawlers({ lat, lng })
  }, [])


  // function openBoard(lat, lng) {
  //   setLocation(`${lat},${lng}`)
  // }

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
    // setMarkerIsLoaded(false)
    getMapCrawlers()
  }

  return (
    <>
      <StoreDrawer
        id={mapCrawlerId}
        setMapCrawlerId={setMapCrawlerId}
        removeMarker={removeMarker}
      />
      <Button onClick={getMapCrawlers}>Search</Button>
      <CrawlBoard location={location} refreshMap={handleRefresh} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
