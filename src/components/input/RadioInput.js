import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"

function RadioInput({label, options}) {
  return (
    <FormControl component="fieldset" fullWidth margin='dense'>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        {options.map(option => {
          return <FormControlLabel
            key={label + option[0]}
            value={option[0]}
            control={<Radio color="primary" />}
            label={option[1]}
          />
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioInput
