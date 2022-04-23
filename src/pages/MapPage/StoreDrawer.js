import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  List,
  Stack,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material"
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material"
import { red } from "@mui/material/colors"
import { getStore } from "../../apis/stores"
import RatingStars from "../../components/ui/RatingStars"
import { toggleFavorite } from "../../apis/user/stores"

export default function StoreDrawer({ id, setStoreId }) {
  const [store, setStore] = useState(null)
  const [state, setState] = useState(false)

  useEffect(() => {
    if (id) {
      setState(true)
      handleGetStore(id)
    }
  }, [id])

  async function handleGetStore(id) {
    const res = await getStore(id)
    setStore(res.data)
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    if (!open) {
      setStore(null)
      setStoreId(null)
    }

    setState(open)
  }

  async function addToFavorite() {
    await toggleFavorite(id)
  }

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {store && (
        <>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 2, mt: 2, mb: 1 }}
          >
            {store.name}
          </Typography>
          <Stack direction="row" ml={2} mb={2} spacing={1}>
            <Button
              variant="outlined"
              // sx={{ color: red[500] }}
              startIcon={<FavoriteIcon sx={{ color: red[500] }} />}
              onClick={addToFavorite}
            >
              加到最愛
            </Button>
          </Stack>
          <Stack direction="row" ml={2} spacing={1}>
            <Typography variant="body2">{store.rating} </Typography>
            <RatingStars rating={store.rating} />
            <Typography variant="body2">
              {store.user_ratings_total} 則評論
            </Typography>
          </Stack>
          <List>
            <ListItem button component="a" target="_blank" href={store.url}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={store.address} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={store.phone} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ClockIcon />
              </ListItemIcon>
              <ListItemText primary="營業時間" />
            </ListItem>
            <Stack ml={12}>
              {store.source_data.opening_hours.map((hour) => {
                return (
                  <Typography key={hour} variant="subtitle1" mb={1}>
                    {hour}
                  </Typography>
                )
              })}
            </Stack>
          </List>
        </>
      )}
    </Box>
  )

  return (
    <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  )
}
