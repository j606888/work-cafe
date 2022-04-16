import { useEffect, useState } from "react"
import Marker from "./Marker"
import { allStores } from '../../apis/stores'

const Markers = ({ map }) => {
  const [stores, setStores] = useState(null)
  useEffect(() => {
    allStores().then(res => {
      const { stores: storesData, paging } = res.data

      setStores(storesData)
    })
  }, [])

  const markers = stores && stores.map(store => {
    const position = {
      lat: store.location_lat,
      lng: store.location_lng
    }
    return <Marker
      key={store.id}
      map={map}
      label={store.name}
      position={position}
      url={store.url}
    /> 
  })
  return <>{markers}</>
}

export default Markers
