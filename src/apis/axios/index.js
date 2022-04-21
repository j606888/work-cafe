import axios from "axios"
const API_HOST = process.env.REACT_APP_API_HOST

axios.defaults.baseURL = API_HOST
axios.defaults.headers.post["Content-Type"] = "application/json"

export default axios
