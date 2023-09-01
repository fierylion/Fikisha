import axios from 'axios'
const dev = true
const api = axios.create({
  baseURL: dev ? 'http://localhost:8000/' : 'https://fierylion.me/',
})
export default api
