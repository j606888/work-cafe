import { useState, useEffect } from "react"

const Searcher = ({ map }) => {
  const geocoder = new window.google.maps.Geocoder()
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

        new window.google.maps.Marker({
          position: {
            lat,
            lng,
          },
          label: address,
          map,
        })
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
