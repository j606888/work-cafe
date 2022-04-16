import { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { allStores } from "../../apis/stores"
import Link from "@mui/material/Link"

export default function Stores() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      const res = await allStores()
      setStores(res.data.stores)
    }

    callAPI()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>咖啡廳</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">電話</TableCell>
            <TableCell align="right">座標</TableCell>
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
              <TableCell align="right">{store.id}</TableCell>
              <TableCell align="right">{store.phone}</TableCell>
              <TableCell align="right">{`${store.lat},${store.lng}`}</TableCell>
              <TableCell align="right">{store.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
