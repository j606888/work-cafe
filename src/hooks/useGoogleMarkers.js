import { useEffect, useState } from "react"

export default function useGoogleMarkers({ map, items, onClick }) {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (markers.length > 0) return

    const itemMarkers = items.map((item) => {
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
      marker.id = id

      if (onClick) {
        marker.addListener("click", () => onClick(id))
      }

      return marker
    })
    setMarkers(itemMarkers)
  }, [map, items, markers.length, onClick])

  return markers
}
