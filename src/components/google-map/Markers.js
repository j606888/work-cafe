import Marker from "./Marker"

const DATA = [
  {
    label: "A",
    position: {
      lat: 23.000332,
      lng: 120.2036,
    },
  },
  {
    label: "C",
    position: {
      lat: 22.9988214,
      lng: 120.2087184,
    },
  },
]
const Markers = ({ map }) => {
  const markers = DATA.map((marker) => {
    return (
      <Marker
        key={marker.label}
        map={map}
        label={marker.label}
        position={marker.position}
      />
    )
  })
  return <>{markers}</>
}

export default Markers
