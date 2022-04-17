import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Container from "@material-ui/core/Container"
import InputLabel from "@material-ui/core/InputLabel"
import { useState } from "react"
import TextInput from "../input/TextInput"
import RadioInput from "../input/RadioInput"

const NewStore = () => {
  const [city, setCity] = useState("")
  function handleSubmit() {}

  function handleChange(event) {
    setCity(event.target.value)
  }

  const formControlStyle = {
    minWidth: 160,
  }
  return (
    <Container maxWidth="md">
      <h1>新增店家</h1>
      <h3>新增店家後需要 1 ~ 3 個工作天來審核</h3>
      <form onSubmit={handleSubmit}>
        <FormControl style={formControlStyle}>
          <InputLabel id="city">Country</InputLabel>
          <Select id="city" value={city} labelId="city" onChange={handleChange}>
            <MenuItem value={"tainan"}>台南</MenuItem>
            <MenuItem value={"taipei"}>台北</MenuItem>
            <MenuItem value={"taichong"}>台中</MenuItem>
          </Select>
        </FormControl>
        <TextInput name="name" />
        <TextInput name="address" />
        <RadioInput
          label="是否提供 Wifi"
          options={[
            ["Yes", "Yes"],
            ["No", "No"],
          ]}
        />
        <RadioInput
          label="有無限時"
          options={[
            ["Yes", "Yes"],
            ["No", "No"],
          ]}
        />
        <RadioInput
          label="有無插座"
          options={[
            ["Yes", "Yes"],
            ["No", "No"],
          ]}
        />
      </form>
    </Container>
  )
}

export default NewStore
