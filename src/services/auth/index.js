import apiClient from '@/services/axios'
import router from '@/router'
import store from 'store'

const failFunc = err => {
  if (err.message == "Network Error") {
    router.push("/alert")
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
      if (response.data == 'Incorrect') {
        swal('Incorrect Credential!')
      } else if (response.data == 'Inactive') {
        swal('Inactive user! Please verify your email.')
      } else {
        swal('You have successfully logged in!')
        if (response) {
          const { accessToken } = response.data
          if (accessToken) {
            store.set('accessToken', accessToken)
          }
          return response.data
        }
        return false
      }
    })
    .catch(err => {
      if (err.message == "Network Error") {
        failFunc(err)
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

export const verifyUser = (code) => {
  return apiClient
    .get('/auth/confirm/' + code).then((response) => {
      return response.data;
    });
};

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
