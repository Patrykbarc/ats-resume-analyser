import { getEnvs } from '@/lib/getEnv'
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  isAxiosError
} from 'axios'

export const apiClient = axios.create({
  baseURL: `${getEnvs().VITE_API_URL}/api`,
  timeout: 60_000,
  withCredentials: true
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason: unknown) => void
}> = []

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else if (token) {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('jwtToken')

    if (token) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    const { response } = error

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject
          })
        })
      }

      isRefreshing = true

      try {
        const refreshResponse = await apiClient.post('/auth/refresh')
        const newAccessToken = refreshResponse.data.token

        sessionStorage.setItem('jwtToken', newAccessToken)

        isRefreshing = false
        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (refreshError: unknown) {
        isRefreshing = false
        sessionStorage.removeItem('jwtToken')

        if (isAxiosError(refreshError)) {
          processQueue(refreshError)

          window.location.href = '/login'
          return Promise.reject(refreshError)
        }

        processQueue(null)
        window.location.href = '/login'

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
