import { useEffect, useRef, useState } from "react"
import useGoogleMap from "../../hooks/useGoogleMap"
import useGoogleMarkers from "../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import { getAllStores } from "../../apis/stores"

function MapComponent() {
  const [storeId, setStoreId] = useState(null)
  const [stores, setStores] = useState([])
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  useGoogleMarkers(map, stores, setStoreId)

  async function fetchAllStores() {
    const res = await getAllStores({ page: 1, per: 200 })
    setStores(res.data.stores)
  }

  useEffect(() => {
    fetchAllStores()
  }, [])

  return (
    <>
      <StoreDrawer id={storeId} setStoreId={setStoreId} />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
