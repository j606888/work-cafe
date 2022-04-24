import { useEffect, useState } from "react"
import { MarkerClusterer } from "@googlemaps/markerclusterer"

export default function useGoogleCluster({ map, items, isLoaded }) {
  const [cluster, setCluster] = useState(null)

  useEffect(() => {
    if (map && !cluster) {
      const markerCluster = new MarkerClusterer({ map })
      setCluster(markerCluster)
    }
  }, [map, cluster])

  useEffect(() => {
    const isReady = map && isLoaded && cluster
    if (!isReady) return

    const markers = items
      .filter((item) => !item.hidden)
      .map((item) => {
        return item.marker
      })

    cluster.clearMarkers()
    cluster.addMarkers(markers)
    setCluster(cluster)
  }, [map, items, isLoaded, cluster])
}
