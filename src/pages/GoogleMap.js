import MapWrapper from "../components/google-map/MapWrapper"
// import MyMapComponent from "../components/google-map/MyMapComponent"

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const render = (status) => {
  return <h1>{status}</h1>
}

const GoogleMap = () => {
  const center = { lat: 22.9956001, lng: 120.2101171 }
  const zoom = 16

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
