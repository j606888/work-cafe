import { useState, useEffect, useContext } from "react"
import {
  Box,
  Drawer,
  List,
  Stack,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
} from "@mui/icons-material"
import { getStore } from "../../apis/stores"
import RatingStars from "../../components/ui/RatingStars"
import FavoriteContext from "../../context/FavoriteContext"
import FavoriteButton from "./FavoriteButton"

export default function StoreDrawer({ id, setStoreId }) {
  const { favoriteStores, fetchFavoriteStores } = useContext(FavoriteContext)
  const [store, setStore] = useState(null)
  const [state, setState] = useState(false)

  useEffect(() => {
    console.log(fetchFavoriteStores)
    fetchFavoriteStores()
  }, [])

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
          <FavoriteButton
            favoriteStores={favoriteStores}
            store={store}
            fetchFavoriteStores={fetchFavoriteStores}
          />
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
