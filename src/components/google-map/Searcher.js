import { useState } from "react"

const Searcher = (props) => {
  const geocoder = new window.google.maps.Geocoder()
  const { setProp } = props
  const [address, setAddress] = useState("")

  const onSearch = () => {
    geocoder
      .geocode({ address })
      .then((result) => {
        const { results } = result
        const firstResult = results[0]
        const location = firstResult.geometry.location
        const lat = location.lat()
        const lng = location.lng()
        setProp({ position: { lat, lng }, label: address })
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e)
      })
  }

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={onSearch}>Buscar</button>
    </>
  )
}

export default Searcher
