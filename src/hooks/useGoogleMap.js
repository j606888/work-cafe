import { useCallback, useEffect, useState } from "react"
import { createSearchParams, useSearchParams } from "react-router-dom"

const DEFAULT_SETUP = {
  center: {
    lat: 22.9918511,
    lng: 120.2066457,
  },
  zoom: 16,
  fullscreenControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
}

export default function useGoogleMap({ ref }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [map, setMap] = useState(null)

  const currentParams = useCallback(() => {
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const zoom = searchParams.get("zoom")

    return {
      lat,
      lng,
      zoom,
    }
  }, [searchParams])

  useEffect(() => {
    if (!map) return

    map.addListener("dragend", () => {
      const center = map.getCenter()
      const lat = center.lat().toFixed(6)
      const lng = center.lng().toFixed(6)

      const params = currentParams()
      setSearchParams(createSearchParams({ ...params, lat, lng }), { replace: true })
    })

    map.addListener("zoom_changed", () => {
      const zoom = map.getZoom()

      const params = currentParams()
      setSearchParams(createSearchParams({ ...params, zoom }), { replace: true })
    })
  }, [map, setSearchParams, currentParams])

  useEffect(() => {
    if (ref.current && !map) {
      const settings = DEFAULT_SETUP
      const urlSettings = currentParams()
      const googleMap = new window.google.maps.Map(ref.current, settings)

      setMap(googleMap)
    }
  }, [ref, map, searchParams])

  return map
}
