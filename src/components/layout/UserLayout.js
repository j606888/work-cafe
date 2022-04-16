import { Container, Box } from "@mui/material"
import Navbar from "../ui/Navbar"

const UserLayout = ({ children, mt=0, maxWidth="sm" }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth={maxWidth}>
        <Box mt={8 + mt}>{children}</Box>
      </Container>
    </>
  )
}

export default UserLayout
