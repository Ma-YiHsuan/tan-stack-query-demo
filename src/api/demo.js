import { localAxios } from './axios'

export const postToGetDemo = (data) =>
  localAxios.post('/api/v1/workmanager/works/lale-work/list', data)

export const refreshToken = () => localAxios.get('/api/new/token')
