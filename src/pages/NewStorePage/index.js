import UserLayout from "../../components/layout/UserLayout"
import NewMapUrl from "./NewMapUrl"
import MapUserList from "./MapUrlList"
import { useEffect, useState } from "react"
import { getAllMapUrls } from "../../apis/map_url"

const NewStorePage = () => {
  const [mapUrls, setMapUrls] = useState([])
  const [page, setPage] = useState(1)
  const [per, setPer] = useState(10)
  const [paging, setPaging] = useState(null)

  function handleCreate() {
    fetchMapUrls(page, per)
  }

  async function fetchMapUrls(page, per) {
    const res = await getAllMapUrls(page, per)
    const { map_urls, paging } = res.data

    setMapUrls(map_urls)
    setPaging(paging)
  }

  useEffect(() => {
    fetchMapUrls(page, per)
  }, [page, per])

  return (
    <UserLayout maxWidth="none" mt={3}>
      <NewMapUrl newMapUrlCreated={handleCreate} />
      {paging && (
        <MapUserList
          mapUrls={mapUrls}
          paging={paging}
          setPage={setPage}
          setPer={setPer}
          per={per}
        />
      )}
    </UserLayout>
  )
}

export default NewStorePage
