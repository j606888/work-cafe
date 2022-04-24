import { useEffect, useState } from "react"
import { createSearchParams, useSearchParams } from "react-router-dom"

const DEFAULT_SETUP = {
  center: {
    lat: 22.9918511,
    lng: 120.2066457,
  },
  zoom: 16,
  fullscreenControl: false,
}

export default function useGoogleMap({ ref, handleOnClick }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const settings = DEFAULT_SETUP
      const lat = searchParams.get('lat')
      const lng = searchParams.get("lng")
      if (lat && lng) {
        settings.center = { lat: +lat, lng: +lng }
      }
      const googleMap = new window.google.maps.Map(ref.current, settings)

      googleMap.addListener("click", (mapMouseEvent) => {
        const location = mapMouseEvent.latLng.toJSON()
        if (handleOnClick) {
          handleOnClick(location.lat, location.lng)
        }
      })

      googleMap.addListener("dragend", () => {
        const center = googleMap.getCenter()
        const lat = center.lat().toFixed(6)
        const lng = center.lng().toFixed(6)
        setSearchParams(createSearchParams({ lat, lng }))
      })

      setMap(googleMap)
    }
  }, [ref, map, handleOnClick])

  return map
}
