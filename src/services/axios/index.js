import axios from 'axios'
import store from 'store'
// import config from '../../config'

const apiClient = axios.create({
  baseURL: '/api',
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }

  request.headers.common['Content-Type'] = 'application/json'
  request.headers.common['Access-Control-Allow-Origin'] = '*'
  return request
})

// apiClient.interceptors.response.use(undefined, error => {
//   // Errors handling
//   const { response } = error
//   const { data } = response
//   if (data) {
//     console.log(data)
//   }
// })

export default apiClient
