import { getEnv } from '@/lib/getEnv'
import axios from 'axios'

const env = getEnv()

export const apiClient = axios.create({
  baseURL: `${env.API_URL}/api`,
  timeout: 20_000
})
