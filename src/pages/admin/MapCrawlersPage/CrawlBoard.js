import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { search } from '../../../apis/admin/map_crawlers'

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
  const handleClose = () => setOpen(false)

  async function handleSearch() {
    const res = await search(location)
    setOpen(false)
    
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The location is {location}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to crawl here?
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant='contained' onClick={handleSearch}>Yes</Button>
            <Button variant='contained' color="error" onClick={handleClose}>No</Button>

          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
