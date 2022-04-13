import { Container, Box } from "@mui/material"
import Navbar from "../ui/Navbar"

const UserLayout = ({ children, mt=0 }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box mt={8 + mt}>
          {children}
        </Box>
      </Container>
    </>
  )
}

export default UserLayout
