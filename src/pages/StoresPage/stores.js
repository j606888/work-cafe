import UserLayout from "../../components/layout/UserLayout"
import Stores from "../../feature/Stores"

const StoresPage = () => {
  return (
    <UserLayout maxWidth="none" mt={3}>
      <Stores />
    </UserLayout>
  )
}

export default StoresPage
