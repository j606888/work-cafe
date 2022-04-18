import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import Link from "@mui/material/Link"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import dayjs from "dayjs"
import { Chip } from "@mui/material"
import ListTab from "./ListTab"

const columns = [
  { id: "name", label: "店名", minWidth: 120 },
  {
    id: "status",
    label: "審核狀態",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "created_at",
    label: "建立日期",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "url",
    label: "GoogleMap",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
]

const CHIP_COLOR_MAP = {
  created: "warning",
  accept: "success",
  deny: "error",
}
export default function MapUserList({ mapUrls, paging, setPage, setPer, per, setStatus }) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setPer(+event.target.value)
    setPage(1)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <ListTab setStatus={setStatus} />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mapUrls.map((mapUrl) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={mapUrl.id}>
                  <TableCell align="left">{mapUrl.keyword}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={mapUrl.status}
                      color={CHIP_COLOR_MAP[mapUrl.status]}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(mapUrl.created_at).format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={mapUrl.url} target="_blank" rel="noopener">
                      Check
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={paging.total_count}
        rowsPerPage={per}
        page={paging.current_page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
