import { useEffect } from "react"

const Marker = ({ map, position, label, url, icon }) => {
  useEffect(() => {
    if (map && label) {
      const marker = new window.google.maps.Marker()
      marker.setOptions({
        position,
        label,
        map,
        icon
      })

      marker.addListener("click", () => {
        alert(`${label} is clicked!`)
        map.setZoom(18)
        map.setCenter(marker.getPosition())
        window.location.replace(url)
      })
    }
  
  }, [map, label, position, url, icon])

  return null
}

export default Marker
