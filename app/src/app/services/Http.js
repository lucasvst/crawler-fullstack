import axios from 'axios'
import API from './../../env/api'

const client = axios.create({ baseURL: API.url })

export default client
