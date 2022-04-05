import Navbar from "../components/ui/Navbar"
import Normal from "../components/layout/Normal"
import NewStore from "../components/store/NewStore"

function HomePage() {
  return (
    <>
      <Navbar />
      <Normal>
        <NewStore />
      </Normal>
    </>
  )
}

export default HomePage
