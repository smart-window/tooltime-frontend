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

export const getCategories = async () => {
  return axiosClient
    .get('/category')
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(failFunc)
}
