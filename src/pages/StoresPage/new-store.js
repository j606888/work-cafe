import UserLayout from "../../components/layout/UserLayout"
import NewMapUrl from "../../feature/MapUrl/NewMapUrl"
import MapUserList from "../../feature/MapUrl/MapUrlList"
import { useEffect, useState } from "react"
import { listMapUrls } from "../../apis/map_url"

const NewStore = () => {
  const [mapUrls, setMapUrls] = useState([])
  const [paging, setPaging] = useState(null)

  useEffect(() => {
    async function fetchMapUrls() {
      const res = await listMapUrls()
      const { map_urls, paging } = res.data

      setMapUrls(map_urls)
      setPaging(paging)
      console.log(paging)
    }

    fetchMapUrls()
  }, [])

  return (
    <UserLayout maxWidth="none" mt={3}>
      <NewMapUrl />
      {paging && <MapUserList mapUrls={mapUrls} paging={paging} />}
    </UserLayout>
  )
}

export default NewStore
