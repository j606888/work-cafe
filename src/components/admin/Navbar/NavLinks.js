import { Box, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const style = {
  button: {
    color: "white",
    display: "block",
  },
}
const NavLinks = ({ navs }) => {
  const buttons = navs.map((nav) => {
    return (
      <Button key={nav[1]} sx={style.button} component={RouterLink} to={nav[1]}>
        {nav[0]}
      </Button>
    )
  })

  return <Box sx={{ flexGrow: 1, display: "flex" }}>{buttons}</Box>
}

export default NavLinks
