import MapWrapper from "../components/google-map/MapWrapper"
import NavbarContainer from "../components/layout/NavbarContainer"

const GoogleMap = () => {
  return (
    <NavbarContainer>
      <h1>My Map</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        <MapWrapper />
      </div>
    </NavbarContainer>
  )
}

export default GoogleMap
