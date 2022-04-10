import { useEffect, useRef, useState } from "react"

import Searcher from "./Searcher"
import Markers from "./Markers"
import CurrentPosition from "./CurrentPosition"

function MyMapComponent() {
  const ref = useRef(null)
  const [map, setMap] = useState()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: {
            lat: 22.9918511,
            lng: 120.2066457,
          },
          zoom: 14,
          mapTypeId: 'roadmap'
        })
      )
    }
  }, [ref, map])

  return (
    <>
      <Searcher map={map} />
      <div style={{ height: "20px" }} />
      <CurrentPosition map={map} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}>
        <Markers map={map} />
      </div>
    </>
  )
}

export default MyMapComponent
