import StarIcon from "@mui/icons-material/Star"
import StarHalfIcon from "@mui/icons-material/StarHalf"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { Box } from "@mui/material"

const style = {
  color: "#FABC05",
  fontSize: 18,
}

function chooseStar(limit, rating) {
  const current = rating - limit
  if (current >= 0) {
    return <StarIcon sx={style} />
  } else if (current >= -0.5) {
    return <StarHalfIcon sx={style} />
  } else {
    return <StarBorderIcon sx={style} />
  }
}
const RatingStars = ({ rating }) => {
  return (
    <Box>
      {chooseStar(1, rating)}
      {chooseStar(2, rating)}
      {chooseStar(3, rating)}
      {chooseStar(4, rating)}
      {chooseStar(5, rating)}
    </Box>
  )
}

export default RatingStars
