import { useEffect, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer"

export default function useGoogleCluster(map, items, isLoaded) {
  const [cluster, setCluster] = useState(null)

  useEffect(() => {
    const isReady = map && isLoaded && !cluster
    if (!isReady) return

    const markers = items.map((item) => item.marker)
    const markerCluster = new MarkerClusterer({ map, markers })
    setCluster(markerCluster)
  }, [map, items, cluster, isLoaded])

  return cluster
}
