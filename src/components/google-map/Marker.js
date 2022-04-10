import { useEffect } from "react"

const Marker = ({ map, position, label, url }) => {
  useEffect(() => {
    if (map && label) {
      const marker = new window.google.maps.Marker()
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
  
  }, [map, label, position, url])

  return null
}

export default Marker
