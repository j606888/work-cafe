import { Avatar, Divider, Stack, Typography } from "@mui/material"
import RatingStars from "./RatingStars"

export default function ReviewCard({ review }) {
  const {
    profile_photo_url,
    author_name,
    rating,
    relative_time_description,
    text,
  } = review

  return (
    <>
      <Stack p={3}>
        <Stack spacing={2} direction="row" alignItems="center" mb={1}>
          <Avatar
            alt="somegut"
            src={profile_photo_url}
            sx={{ width: 36, height: 36 }}
          />
          <Typography variant="subtitle1">{author_name}</Typography>
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center" mb={1}>
          <RatingStars rating={rating} />
          <Typography variant="body2" color="#999">
            {relative_time_description}
          </Typography>
        </Stack>
        <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>{text}</Typography>
      </Stack>
      <Divider />
    </>
  )
}
