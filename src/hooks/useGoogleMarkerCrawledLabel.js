import { useEffect } from "react"

export default function useGoogleMarkerCrawledLabel({ items }) {
  useEffect(() => {
    items.forEach((item) => {
      if (item.status === "accept") {
        item.marker.setOptions({ icon: "/green_24.png" })
      } else if (item.status === "deny") {
        item.marker.setOptions({ icon: "/black_24.png" })
      }
    })
  }, [items])
}
