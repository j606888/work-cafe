import { useEffect, useMemo } from "react"

export default function useGoogleMarkerHidden({ markers, hiddenItems }) {
  const hiddenMap = useMemo(() => {
    const idMap = {}
    hiddenItems.forEach((item) => (idMap[item.id] = true))
    return idMap
  }, [hiddenItems])

  useEffect(() => {
    markers.forEach(marker => {
      if(hiddenMap[marker.id]) {
        marker.setMap(null)
      }
    })

  }, [markers, hiddenMap])
}
