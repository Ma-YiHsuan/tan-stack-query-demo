import Axios from 'axios'
import { useGlobalState } from '@/composable/useGlobalStore'

const localAxios = Axios.create({
  baseURL: 'http://192.168.3.74:3001/',
})
localAxios.interceptors.request.use((config) => {
  const { token } = useGlobalState()
  config.headers.token = token.value
  return config
})

const laleAxios = Axios.create()

export { localAxios, laleAxios }
