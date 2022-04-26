import { useCallback, useEffect, useRef, useState } from "react"
import useGoogleMap from "../../../hooks/useGoogleMap"
import useGoogleMarkers from "../../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import CrawlBoard from "./CrawlBoard"
import { getAllMapCrawlers } from "../../../apis/admin/map_crawlers"
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
    setMapCrawlerId(id)
  }, [])
  const ref = useRef(null)

  // googleMap.addListener("click", (mapMouseEvent) => {
  //   const location = mapMouseEvent.latLng.toJSON()
  //   if (handleOnClick) {
  //     handleOnClick(location.lat, location.lng)
  //   }
  // })

  const getParams = useCallback(() => {
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    return {
      lat,
      lng,
    }
    // Only want to getParams first time 
  }, [])

  const map = useGoogleMap({ ref })
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
        per: 30,
        lat,
        lng,
        status: 'created'
      })
      const { map_crawlers } = res.data
      setMapCrawlers(map_crawlers)
    }

    doGetMapCrawlers()
  }, [])


  // first time init
  useEffect(() => {
    const params = getParams()

    getMapCrawlers(params)
  }, [getParams, getMapCrawlers])


  function removeMarker(id) {
    const marker = markers.find((m) => m.id === id)
    marker.setMap(null)
  }

  function handleRefresh() {
    markers.forEach((marker) => {
      marker.setMap(null)
    })

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    getMapCrawlers({ lat, lng })
  }

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <StoreDrawer
        id={mapCrawlerId}
        setMapCrawlerId={setMapCrawlerId}
        removeMarker={removeMarker}
      />
      <Button
        variant="contained"
        onClick={handleRefresh}
        sx={{ position: "absolute", top: "2%", left: "50%", zIndex: "modal" }}
      >
        搜尋這個區域
      </Button>
      <CrawlBoard location={location} refreshMap={handleRefresh} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </div>
  )
}

export default MapComponent
