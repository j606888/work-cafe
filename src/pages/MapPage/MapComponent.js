import { useEffect, useRef, useState, useContext} from "react"
import useGoogleMap from "../../hooks/useGoogleMap"
import useGoogleMarkers from "../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import { getAllStores } from "../../apis/stores"
import FavoriteContext from "../../context/FavoriteContext"

function MapComponent() {
  const { favoriteStores, fetchFavoriteStores, toggleFavroiteStore } =
    useContext(FavoriteContext)
  const [storeId, setStoreId] = useState(null)
  const [stores, setStores] = useState([])
  const ref = useRef(null)
  const map = useGoogleMap(ref)
  useGoogleMarkers(map, stores, setStoreId, favoriteStores)

  async function fetchAllStores() {
    await fetchFavoriteStores()
    const res = await getAllStores({ page: 1, per: 200 })
    setStores(res.data.stores)
  }

  useEffect(() => {
    fetchAllStores()
  }, [])

  async function addFavoriteHandler() {
    await toggleFavroiteStore(storeId)
  }

  return (
    <>
      <StoreDrawer
        id={storeId}
        setStoreId={setStoreId}
        favoriteStores={favoriteStores}
        addToFavorite={addFavoriteHandler}
      />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}

export default MapComponent
