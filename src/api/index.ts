import axios from 'axios'
import { API_BASE_URL } from '../constants'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;  charset=UTF-8',
    'Cache-Control': 'no-cache',
  },
})
