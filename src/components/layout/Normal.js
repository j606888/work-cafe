import classes from "./Normal.module.css"

function Normal(props) {
  return <div className={classes.container}>{props.children}</div>
}

export default Normal
