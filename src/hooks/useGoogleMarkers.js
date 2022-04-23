import { useEffect, useState } from "react"

const useMarkers = (map, items, setItemId) => {
  const [markers, setMarkers] = useState([])
  
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
