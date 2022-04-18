import UserLayout from "../../../components/layout/UserLayout"
import { useEffect, useState } from "react"
import { getAllMapurls } from "../../../apis/admin/map_url"
import Notification from "../../../components/ui/Notification"
import MapUserList from "./MapUrlLlist"

export default function MapUrlsPage() {
  const [mapUrls, setMapUrls] = useState([])
  const [page, setPage] = useState(1)
  const [per, setPer] = useState(10)
  const [status, setStatus] = useState('created')
  const [paging, setPaging] = useState(null)
  const [open, setOpen] = useState(false)

  async function fetchMapUrls({ page, per, status }) {
    const res = await getAllMapurls({ status, page, per })
    const { map_urls, paging } = res.data

    setMapUrls(map_urls)
    setPaging(paging)
  }

  function handleRefresh() {
    setOpen(true)
    fetchMapUrls({ status, page, per })
  }

  useEffect(() => {
    fetchMapUrls({ status, page, per })
  }, [status, page, per])

  return (
    <UserLayout maxWidth="none" mt={3}>
      <Notification message="綁定成功" open={open} setOpen={setOpen} />
      {paging && (
        <MapUserList
          mapUrls={mapUrls}
          setPage={setPage}
          setPer={setPer}
          paging={paging}
          per={per}
          status={status}
          setStatus={setStatus}
          refreshList={handleRefresh}
        />
      )}
    </UserLayout>
  )
}
