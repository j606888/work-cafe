import { Wrapper } from "@googlemaps/react-wrapper"
import { useRef, useEffect, useState } from "react"

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const render = (status) => {
  return <h1>{status}</h1>
}

function MyMapComponent({ center, zoom }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })
  })

  return <div ref={ref} style={{height: '500px'}}  />
}

const GoogleMap = () => {
  const center = { lat: 22.9956001, lng: 120.2101171 }
  const zoom = 16
  console.log(GOOGLE_MAP_API_KEY)
  console.log(process.env)

  return (
    <Wrapper apiKey={GOOGLE_MAP_API_KEY} render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  )
}

export default GoogleMap
