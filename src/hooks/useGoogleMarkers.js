import { useEffect, useState } from "react"

export default function useGoogleMarkers({ map, items, setItems, setItemId }) {
  const [markerIsLoaded, setMarkerIsLoaded] = useState(false)

  useEffect(() => {
    const isReady = map && items.length > 0 && !markerIsLoaded
    if (!isReady) return

    items.forEach((item) => {
      const marker = new window.google.maps.Marker()
      const { id, name, lat, lng } = item
      marker.setOptions({
        position: {
          lat,
          lng,
        },
        // label: {text: name, color: '#999', fontSize: '8px', fontWeight: 'bold'},
        label: name,
        map: map,
      })
      marker.addListener("click", () => {
        setItemId(id)
      })
      item.marker = marker
    })

    setItems(items)
    setMarkerIsLoaded(true)
  }, [map, items, setItems, setItemId, markerIsLoaded])

  return markerIsLoaded
}
