import { useEffect, useState } from "react"

const Marker = ({ map, position, label, url }) => {
  const [marker, setMarker] = useState()

  useEffect(() => {
    if (map && !marker) {
      setMarker(new window.google.maps.Marker())

      return () => {
        if (marker) {
          marker.setMap(null)
        }
      }
    }
  }, [map, marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions({
        position: position,
        label: label,
        map: map,
      })

      marker.addListener("click", () => {
        alert(`${label} is clicked!`)
        map.setZoom(18)
        map.setCenter(marker.getPosition())
        window.location.replace(url)
      })
    }
  }, [map, marker, position, label, url])

  return null
}

export default Marker
