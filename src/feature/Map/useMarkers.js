import { useEffect, useState } from "react"
import { allStores } from "../../apis/stores"

const useMarkers = (map) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const getStores = async () => {
      const res = await allStores()
      const { stores, paging } = res.data

      const storeMarkers = stores.map((store) => {
        const { id, name, lat, lng } = store
        const marker = new window.google.maps.Marker()
        marker.setOptions({
          position: {
            lat, lng
          },
          label: name,
          map: map
        })

        marker.addListener("click", () => {
          alert(`${name} is clicked`)
          map.setZoom(18)
          map.setCenter(marker.getPosition())
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
