import { useState } from "react"
import Marker from "./Marker"
const PIN_ICON = "http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png"

const CurrentPosition = ({ map }) => {
  const [position, setPosition] = useState()

  function findMe() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 20,
          }

          map.setCenter(pos)
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          alert("failed")
        }
      )
    } else {
      alert("Not support")
    }
  }

  return (
    <>
      {position && (
        <Marker
          map={map}
          position={position}
          label="所在位置"
          icon={PIN_ICON}
        />
      )}
      <button onClick={findMe}>Find Me</button>
    </>
  )
}

export default CurrentPosition
