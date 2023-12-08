import axios from 'axios'
import { TLogin, TSignup, TUserUpdate } from '../interfaces'

const { REACT_APP_MONGO_HOSTING } = process.env

export const tokenAuth = async (token: string) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/user/tokenAuth`

  return await axios
    .post(uri, { token })
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const signup = async (data: TSignup) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/user/signup`

  return await axios
    .post(uri, data)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const login = async (data: TLogin) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/user/login`

  return await axios
    .post(uri, data)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const update = async (data: TUserUpdate) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/user/update`

  return await axios
    .post(uri, data)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const getAllUsers = async () => {
  const uri = `${REACT_APP_MONGO_HOSTING}/user/getAll`

  return await axios
    .get(uri)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const setLocalStorage = (token: string = '') => {
  localStorage.setItem('taskman-token', token)
}

export const getLocalStorage = () => {
  const token = localStorage.getItem('taskman-token') || ''
  return { token }
}

export const clearLocalStorage = () => {
  localStorage.removeItem('taskman-token')
}
