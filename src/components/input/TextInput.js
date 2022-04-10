import { TextField } from '@material-ui/core'

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
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

export default TextInput
