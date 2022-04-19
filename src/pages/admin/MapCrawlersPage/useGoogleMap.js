import { useEffect, useState } from 'react'

export default function useGoogleMap(ref, openBoard) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      const googleMap = new window.google.maps.Map(ref.current, {
        center: {
          lat: 22.9918511,
          lng: 120.2066457,
        },
        zoom: 16,
        fullscreenControl: false,
      })

      googleMap.addListener("click", mapMouseEvent => {
        const location = mapMouseEvent.latLng.toJSON()        
        openBoard(location.lat, location.lng)
      })

      setMap(googleMap)
    }

  }, [ref, map, openBoard])

  return map
}
