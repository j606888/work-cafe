import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { bindStore, searchNearby } from "../../../apis/admin/map_url"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import StarIcon from "@mui/icons-material/Star"
import { Alert } from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  maxWidth: '80%',
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 12,
  p: 4,
}

export default function MapUrlModal({ open, setOpen, id, refreshList }) {
  const [places, setPlaces] = React.useState([])
  const [errorMessage, setErrorMessage] = React.useState(null)

  async function getNearby(id) {
    setErrorMessage(null)
    try {
      const res = await searchNearby(id)
      setPlaces(res.data)
    } catch (error) {
      const res = error.response
      if (res.status === 409) {
        setErrorMessage(res.data.reason)
      }
    }
  }

  async function handleBind(placeId) {
    const res = await bindStore({ id, placeId})
    if (res.status === 200) {
      setOpen(false)
      refreshList()
    }
  }

  React.useEffect(() => {
    if (id) {
      setPlaces([])
      getNearby(id)
    }
  }, [id])

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            搜尋結果({places.length})
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {places.map(place => {
            return (
              <div key={place.place_id}>
                <h3>{place.name}</h3>
                <p>
                  <LocationOnIcon />
                  {place.vicinity}
                </p>
                <p>
                  <SpeakerNotesIcon />
                  {place.user_ratings_total} 筆評論
                </p>
                <p>
                  <StarIcon />
                  {place.rating} 星
                </p>
                <Button
                  variant="contained"
                  onClick={() => handleBind(place.place_id)}
                >
                  綁定這筆
                </Button>
              </div>
            )
          })}
        </Box>
      </Modal>
    </div>
  )
}
