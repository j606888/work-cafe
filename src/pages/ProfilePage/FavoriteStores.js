import { useEffect, useState } from "react"
import { getAllFavoriteStores } from "../../apis/user/favorites"
export default function FavoriteStores({ user }) {
  const [stores, setStores] = useState([])

  async function getFavoriteStores() {
    const res = await getAllFavoriteStores({ page: 1, per: 50 })
    setStores(res.data.stores)
  }

  useEffect(() => {
    getFavoriteStores()
  }, [user])

  return (
    <>
      <h1>Favorite Stores</h1>
      <ul>
      {stores.map(store => <li>{store.name}</li>)}
      </ul>
    </>
  )
}
