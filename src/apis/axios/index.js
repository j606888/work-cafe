import axios from "axios"
import { API_HOST } from "../../config"

axios.defaults.baseURL = API_HOST
axios.defaults.headers.post["Content-Type"] = "application/json"

export default axios
