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
  const [status, setStatus] = useState("created")

  useEffect(() => {
    setPage(1)
  }, [status])

  function handleCreate() {
    fetchMapUrls(page, per, status)
  }

  async function fetchMapUrls(page, per, status) {
    const res = await getAllMapUrls({ page, per, status })
    const { map_urls, paging } = res.data

    setMapUrls(map_urls)
    setPaging(paging)
  }

  useEffect(() => {
    fetchMapUrls(page, per, status)
  }, [page, per, status])

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
          setStatus={setStatus}
        />
      )}
    </UserLayout>
  )
}

export default NewStorePage
