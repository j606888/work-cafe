import { Stack, Button } from "@mui/material"
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material"
import { red } from "@mui/material/colors"
import { toggleFavorite } from "../../apis/user/favorites"

export default function FavoriteButton({
  favoriteStores,
  store,
  fetchFavoriteStores,
}) {
  const isFavorite = favoriteStores.some((s) => s.id === store.id)
  let icon
  let content
  if (isFavorite) {
    icon = <FavoriteIcon sx={{ color: red[500] }} />
    content = "取消最愛"
  } else {
    icon = <FavoriteBorderIcon sx={{ color: red[500] }} />
    content = "加到最愛"
  }

  async function addToFavorite() {
    await toggleFavorite(store.id)
    await fetchFavoriteStores()
  }

  return (
    <Stack direction="row" ml={2} mb={2} spacing={1}>
      <Button variant="outlined" startIcon={icon} onClick={addToFavorite}>
        {content}
      </Button>
    </Stack>
  )
}
