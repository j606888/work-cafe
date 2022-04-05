import { Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import { useState } from "react"

function Alert({ message, type='success'}) {
  const [open, setOpen] = useState(true)
  const severity = type

  function handleClose() {
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleClose}
    >
      <MuiAlert
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert
