import { Stack, Button } from "@mui/material"
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material"
import { red } from "@mui/material/colors"

export default function FavoriteButton({ isFavorite, addToFavorite }) {
  let button
  if (isFavorite) {
    button = (
      <Button
        variant="outlined"
        startIcon={<FavoriteIcon sx={{ color: red[500] }} />}
        onClick={addToFavorite}
      >
        取消最愛
      </Button>
    )
  } else {
    button = (
      <Button
        variant="outlined"
        startIcon={<FavoriteBorderIcon sx={{ color: red[500] }} />}
        onClick={addToFavorite}
      >
        加到最愛
      </Button>
    )
  }

  return (
    button
  )
}
