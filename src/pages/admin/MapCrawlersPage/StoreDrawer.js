import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import ListItem from "@mui/material/ListItem"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { getMapCralwer, bindMapCrawler, denyMapCrawler } from "../../../apis/admin/map_crawlers"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import RatingStars from "../../../components/ui/RatingStars"
import ClockIcon from "@mui/icons-material/AccessTime"

export default function StoreDrawer({ id, setMapCrawlerId }) {
  const [mapCrawler, setMapCrawler] = React.useState(null)
  const [state, setState] = React.useState(false)

  React.useEffect(() => {
    if (id) {
      setState(true)
      handleGetStore(id)
    }
  }, [id])

  async function handleGetStore(id) {
    const res = await getMapCralwer(id)
    setMapCrawler(res.data)
  }

  function handleBind() {
    bindMapCrawler(id)
  }

  function handleDeny() {
    denyMapCrawler(id)
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    if (!open) {
      setMapCrawler(null)
      setMapCrawlerId(null)
    }

    setState(open)
  }

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {mapCrawler && (
        <>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 2, mt: 2, mb: 1 }}
          >
            {mapCrawler.name}
          </Typography>
          <Stack direction="row" ml={2} spacing={1}>
            <Typography variant="body2">
              {mapCrawler.source_data.rating}{" "}
            </Typography>
            <RatingStars rating={mapCrawler.source_data.rating} />
            <Typography variant="body2">
              {mapCrawler.source_data.user_ratings_total} 則評論
            </Typography>
          </Stack>
          <List>
            <ListItem button>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={mapCrawler.source_data.vicinity} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ClockIcon />
              </ListItemIcon>
              <ListItemText primary="營業時間" />
            </ListItem>
          </List>
          <Stack spacing={2} sx={{ width: '25%', margin: '0 auto' }}>
            <Button variant="contained" onClick={handleBind}>收藏</Button>
            <Button variant="contained" onClick={handleDeny} color="error">駁回</Button>
          </Stack>
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
