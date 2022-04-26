import { useEffect, useMemo } from 'react'

export default function useGoogleMarkerFavoriteLabel({ markers, favoriteItems }) {
  const favoriteMap = useMemo(() => {
    const idMap = {}
    favoriteItems.forEach((item) => (idMap[item.id] = true))
    return idMap
  }, [favoriteItems])  

  useEffect(() => {
    markers.forEach(marker => {
      if (favoriteMap[marker.id]) {
        marker.setOptions({ icon: "/favorite-icon.png" })
      } else {
        marker.setOptions({ icon: "/blue_pin.png" })
      }
    })
  }, [markers, favoriteMap])
}
