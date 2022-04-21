import AdminLayout from "../../../components/layout/AdminLayout"
import { useEffect, useState } from "react"
import { getAllMapurls } from "../../../apis/admin/map_url"
import Notification from "../../../components/ui/Notification"
import MapUserList from "./MapUrlLlist"

export default function MapUrlsPage() {
  const [mapUrls, setMapUrls] = useState([])
  const [paging, setPaging] = useState(null)
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    per: 10,
    status: 'created'
  })

  useEffect(() => {
    fetchMapUrls(params)
  }, [params])

  async function fetchMapUrls(params) {
    const res = await getAllMapurls(params)
    const { map_urls, paging } = res.data

    setMapUrls(map_urls)
    setPaging(paging)
  }

  function handleRefresh() {
    setOpen(true)
    fetchMapUrls(params)
  }

  return (
    <AdminLayout maxWidth="none" mt={3}>
      <Notification message="綁定成功" open={open} setOpen={setOpen} />
      {paging && (
        <MapUserList
          mapUrls={mapUrls}
          paging={paging}
          refreshList={handleRefresh}
          setParams={setParams}
          params={params}
        />
      )}
    </AdminLayout>
  )
}
