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
import { denyMapUrl } from "../../../apis/admin/map_url"
import { Button, ButtonGroup, Chip } from "@mui/material"
import MapUrlModal from './MapUrlModal'

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
  {
    id: "action",
    label: "動作",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
]

const CHIP_COLOR_MAP = {
  created: "warning",
  accept: "success",
  deny: "error",
}
export default function MapUrlList({ mapUrls, paging, setPage, setPer, per, refreshList }) {
  const [openModal, setOpenModal] = React.useState(false)
  const [modalMapUrlId, setModalMapUrlId] = React.useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setPer(+event.target.value)
    setPage(1)
  }

  async function handleDeny(id) {
    const res = await denyMapUrl(id)
    console.log(res.status)
  }

  function handleSearch(id) {
    console.log(`ID: ${id} will be search`)
    setModalMapUrlId(id)
    setOpenModal(true)
  }

  return (
    <>
      <MapUrlModal
        id={modalMapUrlId}
        open={openModal}
        setOpen={setOpenModal}
        refreshList={refreshList}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 640 }}>
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
                    <TableCell align="right">
                      <ButtonGroup variant="contained" size="small">
                        <Button
                          color="success"
                          onClick={() => handleSearch(mapUrl.id)}
                        >
                          搜尋
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDeny(mapUrl.id)}
                        >
                          駁回
                        </Button>
                      </ButtonGroup>
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
    </>
  )
}
