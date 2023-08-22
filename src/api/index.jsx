import axios from 'axios'
const dev = true
const api = axios.create({
  baseURL: dev ? 'http://localhost:8000/' : 'https://fikisha.onrender.com',
})
export default api
