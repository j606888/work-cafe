import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react'
import Chip from "@mui/material/Chip"
import OutlinedInput from "@mui/material/OutlinedInput"
import cityMap from '../../config/cityMap' 

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function CitySelector({ updateFilters }) {
  const [city, setCity] = useState("")
  const [districts, setDistricts] = useState([])
  const [districtsOptions, setDistrictsOptions] = useState([])

  const cityOptions = cityMap.map(({ name }) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))

  useEffect(() => {
    const targetCity = cityMap.find(({ name }) => name === city)
    if (!targetCity) return

    setDistrictsOptions(targetCity.area)
    setDistricts([])
  }, [city])

  useEffect(() => {
    if (city === "") return
    updateFilters({ city, districts })
  }, [city, districts])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">縣市</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="縣市"
          onChange={(event) => setCity(event.target.value)}
        >
          {cityOptions}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">鄉鎮區</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={districts}
          onChange={(event) => setDistricts(event.target.value)}
          input={<OutlinedInput id="select-multiple-chip" label="鄉鎮區" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {districtsOptions.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
