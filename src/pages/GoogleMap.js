import { Wrapper } from "@googlemaps/react-wrapper"
import Marker from "../components/google-map/Marker"
import Map from "../components/google-map/Map"

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const render = (status) => {
  return <h1>{status}</h1>
}

const GoogleMap = () => {
  const center = { lat: 22.9956001, lng: 120.2101171 }
  const zoom = 16

  return (
    <Wrapper apiKey={GOOGLE_MAP_API_KEY} render={render}>
      <Map center={center} zoom={zoom}>
        <Marker position={center} />
      </Map>
    </Wrapper>
  )
}

export default GoogleMap
