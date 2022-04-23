import { useEffect, useState } from "react"
import { MarkerClusterer } from "@googlemaps/markerclusterer"


const useMarkers = (map, items, setItemId) => {
  const [markers, setMarkers] = useState([])
  const [markerClusterer, setMarkerClusterer] = useState(null)

  useEffect(() => {
    if (!markerClusterer && markers.length > 0) {
      const markersObj = markers.map(marker => marker.marker)
      const markerCluster = new MarkerClusterer({ map, markers: markersObj })
      setMarkerClusterer(markerCluster)
    }
  }, [markers, markerClusterer, map])
  
  
  useEffect(() => {
    if (map && items.length > 0) {
      const markerObjs = items.map((store) => {
        const { id, name, lat, lng } = store
        const marker = new window.google.maps.Marker()
        const options = {
          position: {
            lat,
            lng,
          },
          label: name,
          map: map,
        }
        marker.setOptions(options)

        marker.addListener("click", () => {
          // map.setCenter(marker.getPosition())
          if (setItemId) setItemId(id)
          // This is how to remove a marker
          // marker.setMap(null)
        })
        return { id, marker }
      })

      setMarkers(markerObjs)
    }
  }, [map, items, setItemId])

  return markers
}

export default useMarkers
