import MapWrapper from "../components/google-map/MapWrapper"

const GoogleMap = () => {
  return (
    <div>
      <h1>My Map</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      }}>
        <MapWrapper />
      </div>
    </div>
  )
}

export default GoogleMap
