import apiClient from '@/services/axios'
import store from 'store'

export async function login(email, password) {
  return apiClient
    .post('/auth/login', {
      email,
      password,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => {
      alert('Incorrect credentials')
      console.log(err.message)
    })
}

export async function register(request) {
  return apiClient
    .post('/auth/register', request)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err.message)
      throw new Error(err.message)
    })
}

export async function currentAccount() {
  return apiClient
    .get('/auth/account')
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      return true
    })
    .catch(err => console.log(err))
}
