import { useState, useEffect, useRef } from "react"

function Map({ center, zoom, children }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })
  })

  return (
    <div ref={ref} style={{ height: "500px" }}>
      {children}
    </div>
  )
}

export default Map
