import { useEffect, useState } from "react"

const useMarkers = (map, mapCrawlers, setMapCrawlerId) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (map && mapCrawlers.length > 0) {
      const mapCralwersMakers = mapCrawlers.map((mapCrawler) => {
        const { id, name, lat, lng } = mapCrawler
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
          setMapCrawlerId(id)
        })

        return { id, marker }
      })

      setMarkers(mapCralwersMakers)
    }
  }, [map, mapCrawlers, setMapCrawlerId])


  return markers
}

export default useMarkers
