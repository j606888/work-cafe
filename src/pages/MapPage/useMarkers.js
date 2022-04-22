import { useEffect, useState } from "react"

const useMarkers = (map, stores, setStoreId) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (map && stores.length > 0) {
      const storeMarkers = stores.map((store) => {
        const { id, name, lat, lng } = store
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
          setStoreId(id)
          // This is how to remove a marker
          // marker.setMap(null)
        })
        return { id, marker}
      })
      
      setMarkers(storeMarkers)
    }
  }, [map, stores, setStoreId])

  return markers
}

export default useMarkers
