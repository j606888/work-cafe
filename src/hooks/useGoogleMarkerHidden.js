import { useEffect, useState } from "react"

export default function useGoogleMarkerHidden({ items, setItems, hiddenItems }) {
  const [hiddenMap, setHiddenMap] = useState({})

  useEffect(() => {
    const idMap = {}
    hiddenItems.forEach((item) => (idMap[item.id] = true))
    setHiddenMap(idMap)
    
  }, [hiddenItems])

  useEffect(() => {
    if (items.length === 0) return
    
    items.forEach((item) => {
      const { id, marker } = item
      if (hiddenMap[id]) {
        marker.setMap(null)
        item.hidden = true
      }
    })

    setItems([...items])
  }, [hiddenItems, hiddenMap, setItems])
}
