import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Stack from "@mui/material/Stack"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { getStore } from "../../apis/stores"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import RatingStars from "../../components/ui/RatingStars"
import ClockIcon from "@mui/icons-material/AccessTime"

export default function StoreDrawer({ id, setStoreId }) {
  const [store, setStore] = React.useState(null)
  const [state, setState] = React.useState(false)

  React.useEffect(() => {
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
      onClick={toggleDrawer(false)}
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
    <Drawer  anchor={"left"} open={state} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  )
}
