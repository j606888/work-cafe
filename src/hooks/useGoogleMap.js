import { useEffect, useState } from "react"

const DEFAULT_SETUP = {
  center: {
    lat: 22.9918511,
    lng: 120.2066457,
  },
  zoom: 16,
  fullscreenControl: false,
}

export default function useGoogleMap(ref, onClick) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const googleMap = new window.google.maps.Map(ref.current, DEFAULT_SETUP)

      googleMap.addListener("click", (mapMouseEvent) => {
        const location = mapMouseEvent.latLng.toJSON()
        if (onClick) {
          onClick(location.lat, location.lng)
        }
      })

      setMap(googleMap)
    }
  }, [ref, map, onClick])

  return map
}
