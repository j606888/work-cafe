import { useEffect, useRef, useState, useContext, useCallback } from "react"
import {
  useGoogleMap,
  useGoogleMarkers,
  useGoogleMarkerHidden,
  useGoogleMarkerFavoriteLabel,
} from "../../hooks"
import { getAllStores } from "../../apis/stores"
import { FavoriteContext, HiddenContext } from "../../context"
import StoreDrawer from "./StoreDrawer"

export default function MapComponent() {
  const { favoriteStores, fetchFavoriteStores, toggleFavroiteStore } =
    useContext(FavoriteContext)
  const { hiddenStores, fetchHiddenStores, createHiddenStore } =
    useContext(HiddenContext)
  const [stores, setStores] = useState([])
  const [storeId, setStoreId] = useState(null)
  const ref = useRef(null)

  const markerOnClick = useCallback((id) => {
    setStoreId(id)
  }, [])
  const map = useGoogleMap({ ref })
  const markers = useGoogleMarkers({
    map,
    items: stores,
    onClick: markerOnClick,
  })
  useGoogleMarkerFavoriteLabel({ markers, favoriteItems: favoriteStores })
  useGoogleMarkerHidden({ markers, hiddenItems: hiddenStores })

  const fetchAllStores = useCallback(async () => {
    const res = await getAllStores({ page: 1, per: 30 })
    setStores(res.data.stores)
    await fetchFavoriteStores()
    await fetchHiddenStores()
  }, [fetchHiddenStores, fetchFavoriteStores])

  useEffect(() => {
    fetchAllStores()
  }, [fetchAllStores])

  function addFavoriteHandler() {
    toggleFavroiteStore(storeId)
  }

  function addHiddenHandler() {
    createHiddenStore(storeId)
  }

  return (
    <>
      <StoreDrawer
        id={storeId}
        setStoreId={setStoreId}
        favoriteStores={favoriteStores}
        addToFavorite={addFavoriteHandler}
        addToHidden={addHiddenHandler}
      />
      <div style={{ height: "10px" }} />
      <div ref={ref} style={{ width: "100%", height: "80%" }}></div>
    </>
  )
}
