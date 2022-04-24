import { useEffect, useRef, useState, useContext } from "react"
import useGoogleMap from "../../hooks/useGoogleMap"
import useGoogleMarkers from "../../hooks/useGoogleMarkers"
import StoreDrawer from "./StoreDrawer"
import { getAllStores } from "../../apis/stores"
import FavoriteContext from "../../context/FavoriteContext"
import HiddenContext from "../../context/HiddenContext"
import useGoogleCluster from "../../hooks/useGoogleCluster"
import useGoogleMarkerLabel from "../../hooks/useGoogleMarkerLabel"
import useGoogleMarkerHidden from "../../hooks/useGoogleMarkerHidden"

function MapComponent() {
  const { favoriteStores, fetchFavoriteStores, toggleFavroiteStore } =
    useContext(FavoriteContext)
  const { hiddenStores, fetchHiddenStores, createHiddenStore } = useContext(HiddenContext)
  const [storeId, setStoreId] = useState(null)
  const [stores, setStores] = useState([])
  const ref = useRef(null)
  const map = useGoogleMap({ ref })
  const markerIsLoaded = useGoogleMarkers({
    map,
    items: stores,
    setItems: setStores,
    setItemId: setStoreId,
  })
  useGoogleMarkerLabel({ items: stores, favoriteItems: favoriteStores })
  useGoogleMarkerHidden({
    items: stores,
    hiddenItems: hiddenStores,
    setItems: setStores
  })
  useGoogleCluster({ map, items: stores, isLoaded: markerIsLoaded })

  async function fetchAllStores() {
    const res = await getAllStores({ page: 1, per: 200 })
    setStores(res.data.stores)
    await fetchFavoriteStores()
    await fetchHiddenStores()
  }

  useEffect(() => {
    fetchAllStores()
  }, [])

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
