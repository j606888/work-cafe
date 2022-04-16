import { Wrapper, Status } from "@googlemaps/react-wrapper"
import MapComponent from "./MapComponent"

const render = (status) => {
  if (status === Status.LOADING) return "Loading..."
  if (status === Status.FAILURE) return "Error"
  return null
}

const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} render={render}>
      <MapComponent />
    </Wrapper>
  )
}

export default MapWrapper
