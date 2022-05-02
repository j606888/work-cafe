import { useEffect, useMemo } from "react"

export default function useGoogleMarkerCrawledLabel({ markers, items }) {
  const itemMap = useMemo(() => {
    const idMap = {}
    items.forEach(item => idMap[item.id] = item.status)
    return idMap
  }, [items])

  useEffect(() => {
    markers.forEach((marker) => {
      const status = itemMap[marker.id]
      if (status === "accept") {
        marker.setOptions({ icon: "/green_24.png" })
      } else if (status === "deny") {
        marker.setOptions({ icon: "/black_24.png" })
      }
    })
  }, [itemMap, markers])
}
