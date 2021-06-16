import apiClient from '@/services/axios'
import store from 'store'

const failFunc = err => {
  if (err.message == "Network Error") {
    alert("Server is down")
  } else {
    throw new Error(err.message)
  }
}

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
      if (err.message == "Network Error") {
        failFunc(err)
      } else {
        alert('Incorrect credentials')
      }
    })
}

export async function register(request) {
  return apiClient
    .post('/auth/register', request)
    .then(response => {
      return response.data
    })
    .catch(failFunc)
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
    .catch(failFunc)
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      return true
    })
    .catch(failFunc)
}
