const CurrentPosition = ({ map }) => {
  function findMe() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 18
          }

          map.setCenter(pos)
        },
        () => {
          alert("failed")
        }
      )
    } else {
      alert("Not support")
    }
  }

  return <button onClick={findMe}>Find Me</button>
}

export default CurrentPosition
