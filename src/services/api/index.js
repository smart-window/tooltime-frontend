import axiosClient from '../axios'
import router from '@/router'

const successFunc = response => {
  return response.data
}

const failFunc = err => {
  if (err.message == "Network Error") {
    router.push('/alert')
  } else {
    throw new Error(err.message)
  }
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

export const getServiceAreas = async () => {
  return axiosClient
    .get('/auth/servicearea')
    .then(successFunc)
    .catch(failFunc)
}

export const getLocations = async () => {
  return axiosClient
    .get('/location')
    .then(successFunc)
    .catch(failFunc)
}

export const getOrders = async () => {
  return axiosClient
    .get('/order')
    .then(successFunc)
    .catch(failFunc)
}

export const getOrder = async orderId => {
  return axiosClient
    .get(`/order/${orderId}`)
    .then(successFunc)
    .catch(failFunc)
}

export const createOrder = async request => {
  return axiosClient
    .post('/order', request)
    .then(successFunc)
    .catch(failFunc)
}

export const updateOrder = async (orderId, request) => {
  return axiosClient
    .patch(`/order/${orderId}`, request)
    .then(successFunc)
    .catch(failFunc)
}

export const removeOrder = async orderId => {
  return axiosClient
    .delete(`/order/${orderId}`)
    .then(successFunc)
    .catch(failFunc)
}

export const removeOrderItem = async orderItemId => {
  return axiosClient
    .delete(`/order-item/${orderItemId}`)
    .then(successFunc)
    .catch(failFunc)
}

export const updateProfile = async (customerId, updates) => {
  return axiosClient
    .patch(`/customer/${customerId}`, updates)
    .then(successFunc)
    .catch(failFunc)
}


export const checkoutSession = async (sessionId) => {
  return axiosClient.get('/stripe/checkout-session?sessionId=' + sessionId)
    .then(successFunc)
    .catch(failFunc)
}

export const getConfig = async () => {
  return axiosClient.get('/stripe/config')
    .then(successFunc)
    .catch(failFunc)
}