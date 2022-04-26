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
    if (ref.current && !map) {
      const settings = DEFAULT_SETUP
      // const urlSettings = currentParams()
      const googleMap = new window.google.maps.Map(ref.current, settings)

      googleMap.addListener("dragend", () => {
        const center = googleMap.getCenter()
        const lat = center.lat().toFixed(6)
        const lng = center.lng().toFixed(6)

        const params = currentParams()
        console.log("Pin")
        setSearchParams(createSearchParams({ ...params, lat, lng }), {
          replace: true,
        })
      })

      googleMap.addListener("zoom_changed", () => {
        const zoom = googleMap.getZoom()
        const params = currentParams()
        console.log("Pin")
        setSearchParams(createSearchParams({ ...params, zoom }), {
          replace: true,
        })
      })

      setMap(googleMap)
    }
  }, [ref, map, currentParams, setSearchParams])

  return map
}
