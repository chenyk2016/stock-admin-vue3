import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://47.110.249.94:3456/api',
  timeout: 5000
})
export default instance
