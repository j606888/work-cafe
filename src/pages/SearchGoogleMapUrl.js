import UserLayout from "../components/layout/UserLayout"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useRef, useState } from "react"
import { newStore } from "../apis/stores"

const SearchGoogleMapUrl = () => {
  const inputEl = useRef(null)
  const [errorMessage, setErrorMessage] = useState()
  const [place, setPlace] = useState()

  const handleSubmit = () => {
    setErrorMessage(null)
    const url = inputEl.current.value
    newStore(url)
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
    <UserLayout mt={5}>
      <h1>Create new Store</h1>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          id="outlined-basic"
          label="Google Map Url"
          variant="outlined"
          multiline={true}
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
    </UserLayout>
  )
}

export default SearchGoogleMapUrl
