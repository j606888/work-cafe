import { useEffect, useState } from "react"
import { getAllMapCrawlers } from "../../../apis/admin/map_crawlers"

const useMarkers = (map, setMapCrawlerId) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const getStores = async () => {
      const res = await getAllMapCrawlers({
        page: 1,
        per: 50,
        status: "created",
      })
      const { map_crawlers, paging } = res.data

      const mapCralwersMakers = map_crawlers.map((map_crawler) => {
        const { id, name, lat, lng } = map_crawler
        const marker = new window.google.maps.Marker()
        marker.setOptions({
          position: {
            lat,
            lng,
          },
          label: name,
          map: map,
        })

        marker.addListener("click", () => {
          // map.setCenter(marker.getPosition())
          setMapCrawlerId(id)
          // This is how to remove a marker
          // marker.setMap(null)
        })

        return { id, marker }
      })
      setMarkers(mapCralwersMakers)
    }

    if (map) {
      getStores()
    }
  }, [map])

  return markers
}

export default useMarkers
