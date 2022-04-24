import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { search } from '../../../apis/admin/map_crawlers'
import Notification from '../../../components/ui/Notification';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CrawlBoard({ location, refreshMap }) {
  const [open, setOpen] = React.useState(false)
  const [openNotify, setOpenNotify] = React.useState(false)
  const [notifyMessage, setNotifyMessage] = React.useState("初始化")
  const handleClose = () => setOpen(false)

  async function handleSearch() {
    const res = await search(location)
    const { crawled_count, duplicate_count } = res.data
    setNotifyMessage(`搜尋到 ${crawled_count} 筆店家，其中 ${duplicate_count} 為重複的`)
    setOpen(false)
    setOpenNotify(true)
    
    // alert(res.data.message)
    refreshMap()
  }

  useEffect(() => {
    if (location) {
      setOpen(true)
    }
  }, [location])

  return (
    <div>
      <Notification
        message={notifyMessage}
        open={openNotify}
        setOpen={setOpenNotify}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            搜尋的範圍為方圓600公尺，是否要執行搜尋?
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={handleSearch}>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
