import { useEffect, useState } from "react"
import { getAllStores } from "../../apis/stores"

const useMarkers = (map, setStoreId) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const getStores = async () => {
      const res = await getAllStores({ page: 1, per: 200 })
      const { stores, paging } = res.data

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
          map.setCenter(marker.getPosition())
          setStoreId(id)
          // This is how to remove a marker
          // marker.setMap(null)
        })

        return marker
      })
      setMarkers(storeMarkers)
    }

    if (map) {
      getStores()
    }
  }, [map])

  return markers
}

export default useMarkers
