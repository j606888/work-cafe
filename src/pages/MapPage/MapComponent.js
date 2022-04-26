import { useEffect, useRef, useState, useContext, useCallback } from "react"
import useGoogleMap from "../../hooks/useGoogleMap"
import useGoogleMarkers from "../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import { getAllStores } from "../../apis/stores"
import FavoriteContext from "../../context/FavoriteContext"
import HiddenContext from "../../context/HiddenContext"
import useGoogleCluster from "../../hooks/useGoogleCluster"
import useGoogleMarkerFavoriteLabel from "../../hooks/useGoogleMarkerFavoriteLabel"
import useGoogleMarkerHidden from "../../hooks/useGoogleMarkerHidden"

function MapComponent() {
  const { favoriteStores, fetchFavoriteStores, toggleFavroiteStore } =
    useContext(FavoriteContext)
  const { hiddenStores, fetchHiddenStores, createHiddenStore } = useContext(HiddenContext)
  const [storeId, setStoreId] = useState(null)
  const [stores, setStores] = useState([])
  const markerOnClick = useCallback((id) => {
    setStoreId(id)
  }, [])
  const ref = useRef(null)
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

  useEffect(() => {
    console.log(stores)
  }, [stores])

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

export default MapComponent
