import { TextField } from '@mui/material'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function TextInput({name, formik, type='text'}) {
  return (
    <TextField
      id={name}
      name={name}
      type={type}
      label={capitalizeFirstLetter(name)}
      fullWidth
      margin="dense"
      value={formik && formik.values[name]}
      onChange={formik && formik.handleChange}
      error={formik && formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik && formik.touched[name] && formik.errors[name]}
    />
  )
}

export default TextInput
