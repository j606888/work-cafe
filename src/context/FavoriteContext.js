import { createContext, useCallback, useState } from "react"
import { getAllFavoriteStores, toggleFavorite } from "../apis/user/favorites"

const FavoriteContext = createContext({
  fetchFavoriteStores: () => {},
  toggleFavorite: (storeId) => {},
  favoriteStores: [],
})

export default FavoriteContext

export const FavoriteProvider = ({ children }) => {
  const [favoriteStores, setFavoriteStores] = useState([])

  const fetchFavoriteStores = useCallback(async () => {
    const res = await getAllFavoriteStores({
      per: 100,
      page: 1,
    })
    setFavoriteStores(res.data.stores)
  }, [])

  async function toggleFavroiteStore(storeId) {
    await toggleFavorite(storeId)
    await fetchFavoriteStores()
  }

  let contextData = {
    favoriteStores,
    fetchFavoriteStores,
    toggleFavroiteStore,
  }

  return (
    <FavoriteContext.Provider value={contextData}>
      {children}
    </FavoriteContext.Provider>
  )
}
