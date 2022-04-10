import NavbarContainer from "../components/layout/NavbarContainer"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useRef, useState } from "react"
import Api from "../helper/api"
import StarIcon from "@material-ui/icons/Star"

const SearchGoogleMapUrl = () => {
  const api = new Api()
  const inputEl = useRef(null)
  const [errorMessage, setErrorMessage] = useState()
  const [place, setPlace] = useState()

  const handleSubmit = () => {
    setErrorMessage(null)
    const url = inputEl.current.value
    api
      .parsePlaceId(url)
      .then((res) => {
        const result = res.data
        setPlace(result)
      })
      .catch((error) => {
        const reason = error.response.data.reason

        setErrorMessage(reason)
      })
  }

  return (
    <NavbarContainer>
      <h1>Search Google Map Url</h1>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          id="outlined-basic"
          label="Google Map Url"
          variant="outlined"
          inputRef={inputEl}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Search
        </Button>
      </form>
      {place && (
        <div>
          <p>店名：{place.name}</p>
          <p>地址：{place.address}</p>
          <p>電話：{place.phone}</p>
          <p>評分：{place.rating}</p>
        </div>
      )}
    </NavbarContainer>
  )
}

export default SearchGoogleMapUrl
