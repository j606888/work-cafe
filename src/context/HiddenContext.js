import { createContext, useState } from "react"
import { getAllHiddenStores, createHidden } from "../apis/user/hiddens"

const HiddenContext = createContext({
  fetchHiddenStores: () => {},
  createHiddenStore: (storeId) => {},
  hiddenStores: [],
})

export default HiddenContext

export const HiddenProvider = ({ children }) => {
  const [hiddenStores, setHiddenStores] = useState([])

  async function fetchHiddenStores() {
    const res = await getAllHiddenStores({
      per: 100,
      page: 1,
    })
    setHiddenStores(res.data.stores)
  }

  async function createHiddenStore(storeId) {
    await createHidden(storeId)
    await fetchHiddenStores()
  }

  let contextData = {
    hiddenStores,
    fetchHiddenStores,
    createHiddenStore,
  }

  return (
    <HiddenContext.Provider value={contextData}>
      {children}
    </HiddenContext.Provider>
  )
}
