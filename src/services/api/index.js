import axiosClient from '../axios'

const successFunc = response => {
  return response.data
}

const failFunc = err => {
  console.log(err.message)
  return null
}

export const getProducts = async () => {
  return axiosClient
    .get('/product')
    .then(successFunc)
    .catch(failFunc)
}

export const getProduct = async productId => {
  return axiosClient
    .get(`/product/${productId}`)
    .then(successFunc)
    .catch(failFunc)
}

export const getCategories = async () => {
  return axiosClient
    .get('/category')
    .then(successFunc)
    .catch(failFunc)
}

export const getLocations = async () => {
  return axiosClient
    .get('/location')
    .then(successFunc)
    .catch(failFunc)
}

export const createOrder = async request => {
  return axiosClient
    .post('/order', request)
    .then(successFunc)
    .catch(failFunc)
}
