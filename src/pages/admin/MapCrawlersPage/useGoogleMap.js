import { useEffect, useState } from 'react'

export default function useGoogleMap(ref) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {
          lat: 22.9918511,
          lng: 120.2066457,
        },
        zoom: 14,
        fullscreenControl: false,
      }))
    }

  }, [ref, map])

  return map
}
