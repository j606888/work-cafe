import UserLayout from "../../../components/layout/UserLayout"
import { useEffect, useState } from "react"
import { listmapUrls } from "../../../apis/admin/map_url"
import MapUserList from "../../../feature/Admin/MapUrl/MapUrlLlist"

export default function MapUrlsIndex() {
  const [mapUrls, setMapUrls] = useState([])
  const [page, setPage] = useState(1)
  const [per, setPer] = useState(10)
  const [state, setState] = useState("created")
  const [paging, setPaging] = useState(null)

  async function fetchMapUrls({ page, per, state }) {
    const res = await listmapUrls({ state, page, per })
    const { map_urls, paging } = res.data

    setMapUrls(map_urls)
    setPaging(paging)
  }

  useEffect(() => {
    fetchMapUrls({ state, page, per })
  }, [state, page, per])

  return (
    <UserLayout maxWidth="none" mt={3}>
      {paging && (
        <MapUserList
          mapUrls={mapUrls}
          setPage={setPage}
          setPer={setPer}
          paging={paging}
          per={per}
        />
      )}
    </UserLayout>
  )
}
