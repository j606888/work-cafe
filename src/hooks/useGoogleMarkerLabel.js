import { useEffect, useState } from 'react'

export default function useGoogleMarkerLabel(items, favoriteItems) {
  const [favoriteMap, setFavoriteMap] = useState({})
  
  useEffect(() => {
    const idMap = {}
    favoriteItems.forEach(item => idMap[item.id] = true)
    setFavoriteMap(idMap)
  }, [favoriteItems])

  useEffect(() => {
    items.forEach(({ id, marker }) => {
      if (favoriteMap[id]) {
        marker.setOptions({ icon: "/favorite-icon.png" })
      } else {
        marker.setOptions({ icon: "/blue_pin.png" })
      }
    })
  }, [items, favoriteItems, favoriteMap])
}
