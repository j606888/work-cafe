import { useEffect } from "react"

const Marker = ({ map, position, label }) => {
  useEffect(() => {
    if (map) {
      new window.google.maps.Marker({
        position: position,
        label: label,
        map: map,
      })
    }
  }, [position, map, label])

  return null
}

export default Marker
