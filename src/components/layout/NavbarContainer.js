import Navbar from "../ui/Navbar"
import styles from "./NavbarContainer.module.css"

const NavbarContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  )
}

export default NavbarContainer
