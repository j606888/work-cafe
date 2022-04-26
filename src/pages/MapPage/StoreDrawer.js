import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  List,
  Button,
  Stack,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
} from "@mui/icons-material"
import { getStore } from "../../apis/stores"
import RatingStars from "../../components/ui/RatingStars"
import FavoriteButton from "./FavoriteButton"
import ReviewCard from "../../components/ui/reviewCard"
import OpeningHours from "./OpeningHours"

export default function StoreDrawer({
  id,
  setStoreId,
  favoriteStores,
  addToFavorite,
  addToHidden,
}) {
  const [store, setStore] = useState(null)
  const [state, setState] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      setState(true)
      handleGetStore(id)
      const isFavor = favoriteStores.some((s) => s.id === id)
      setIsFavorite(isFavor)
    }
  }, [id, favoriteStores])

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
          <Stack
            sx={{ width: 400, height: 240, overflow: "hidden" }}
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={store.image_url}
              alt={store.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 3, mt: 2, mb: 1 }}
          >
            {store.name}
          </Typography>
          <Stack direction="row" ml={3} mb={2} spacing={1}>
            <Typography variant="body2" color="#999">
              {store.rating}{" "}
            </Typography>
            <RatingStars rating={store.rating} />
            <Typography variant="body2" color="#1A73E8">
              {store.user_ratings_total} 則評論
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" my={2} mx={3} spacing={1}>
            <FavoriteButton
              isFavorite={isFavorite}
              addToFavorite={addToFavorite}
            />
            <Button variant="outlinted" onClick={addToHidden}>
              隱藏
            </Button>
          </Stack>
          <Divider />
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
            <OpeningHours openingHours={store.opening_hours} />
          </List>
          <Divider />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500" }}
            mt={2}
            ml={2}
          >
            評論
          </Typography>
          {store.source_data.reviews.map((review) => (
            <ReviewCard key={review.time} review={review} />
          ))}
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
