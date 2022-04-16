import { useRef } from "react"
import useMarkers from "./useMarkers"
import useGoogleMap from "./useGoogleMap"

function MapComponent() {
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  const markers = useMarkers(map)

  return (
    <>
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}>
      </div>
    </>
  )
}

export default MapComponent
