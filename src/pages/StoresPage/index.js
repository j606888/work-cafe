import UserLayout from "../../components/layout/UserLayout"
import { useState, useEffect } from "react"
import {
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TablePagination,
  TableCell,
  TableContainer,
} from "@mui/material"
import { getAllStores } from "../../apis/stores"
import Link from "@mui/material/Link"
import RatingStars from "../../components/ui/RatingStars"
import CitySelector from "../../components/ui/CitySelector"

const StoresPage = () => {
  const [stores, setStores] = useState([])
  const [paging, setPaging] = useState(null)
  const [params, setParams] = useState({ page: 1, per: 10 })

  useEffect(() => {
    const callAPI = async () => {
      const res = await getAllStores(params)
      setPaging(res.data.paging)
      setStores(res.data.stores)
    }

    callAPI()
  }, [params])

  function handleChangePage(event, newPage) {
    setParams({ ...params, page: newPage + 1})
  }

  function handleChangeRowsPerPage(event) {
    setParams({ ...params, per: +event.target.value, page: 1 })
  }

  function handleUpdateFilters({ city, districts }) {
    setParams({ ...params, city, districts, page: 1 })
  }

  return (
    <UserLayout maxWidth="none" mt={3}>
      {paging && (
        <>
          <CitySelector updateFilters={handleUpdateFilters} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>咖啡廳</TableCell>
                  <TableCell align="right">縣市</TableCell>
                  <TableCell align="right">鄉鎮區</TableCell>
                  <TableCell align="right">電話</TableCell>
                  <TableCell align="right">評價</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.map((store) => (
                  <TableRow
                    key={store.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={store.url} target="_blank" rel="noreferrer">
                        {store.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{store.city}</TableCell>
                    <TableCell align="right">{store.district}</TableCell>
                    <TableCell align="right">{store.phone}</TableCell>
                    <TableCell align="right">
                      <RatingStars rating={store.rating} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={paging.total_count}
            rowsPerPage={params.per}
            page={paging.current_page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </UserLayout>
  )
}

export default StoresPage
