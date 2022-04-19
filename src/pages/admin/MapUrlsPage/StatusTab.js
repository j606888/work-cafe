import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

const STATES_LIST = ["created", "accept", "deny"]

export default function StatusTab({ setParams }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setParams((preState) => ({ ...preState, status: STATES_LIST[newValue] }))
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="審核中" />
          <Tab label="發布" />
          <Tab label="駁回" />
        </Tabs>
      </Box>
    </Box>
  )
}
