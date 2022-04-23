import { createContext, useState } from "react"
import { getAllFavoriteStores } from "../apis/user/favorites"

const FavoriteContext = createContext({
  fetchFavoriteStores: () => {},
  favoriteStores: [],
})

export default FavoriteContext

export const FavoriteProvider = ({ children }) => {
  const [favoriteStores, setFavoriteStores] = useState([])

  async function fetchFavoriteStores() {
    const res = await getAllFavoriteStores({
      per: 100,
      page: 1,
    })
    setFavoriteStores(res.data.stores)
  }

  let contextData = {
    favoriteStores,
    fetchFavoriteStores,
  }

  return (
    <FavoriteContext.Provider value={contextData}>
      {children}
    </FavoriteContext.Provider>
  )
}
