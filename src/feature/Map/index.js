import { useEffect, useRef, useState } from "react"
import useMarkers from "./useMarkers"
import useGoogleMap from "./useGoogleMap"
// import StoreModal from "./StoreModal"
import StoreDrawer from "./StoreDrawer"

function MapComponent() {
  const [storeId, setStoreId] = useState(null)
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  const markers = useMarkers(map, setStoreId)

  useEffect(() => {
    console.log("storeId change to ", storeId)
  }, [storeId])

  return (
    <>
      {/* <StoreModal id={storeId} setStoreId={setStoreId} /> */}
      <StoreDrawer id={storeId} setStoreId={setStoreId} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
