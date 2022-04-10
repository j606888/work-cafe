import { useEffect, useRef, useState } from "react"

import Searcher from "./Searcher"

function MyMapComponent() {
  const ref = useRef(null)
  const [map, setMap] = useState()
  const [prop, setProp] = useState({position: { lat: 0, lng: 0 }, label: 'init' })

  /**
   * Because google.maps.Map requires an Element as a constructor parameter,
   * useRef is needed to maintain a mutable object
   * that will persist for the lifetime of the component.
   */
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  // Add marker
  useEffect(() => {
    if (map) {
      map.setOptions({ center: prop.position, zoom: 3 })
    }
    new window.google.maps.Marker({
      position: prop.position,
      label: prop.label,
      map,
    })
  }, [map, prop])

  return (
    <>
      <Searcher setProp={setProp} />
      <div style={{ height: "20px" }} />
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
    </>
  )
}

export default MyMapComponent
