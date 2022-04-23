import {
  Stack,
  CircularProgress,
} from "@mui/material"
import { useContext } from "react"
import UserLayout from "../../components/layout/UserLayout"
import AuthContext from "../../context/AuthContext"
import UserInfo from "./UserInfo"
import FavoriteStores from "./FavoriteStores"

const ProfilePage = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <UserLayout mt={5}>
      <UserInfo user={user} />
      <FavoriteStores user={user} />
    </UserLayout>
  )
}

export default ProfilePage
