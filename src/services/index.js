import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:3456/api',
  timeout: 5000
})
export default instance
