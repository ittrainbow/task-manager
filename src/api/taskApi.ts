import axios from 'axios'
import { TTaskCreate, TTaskUpdate } from '../interfaces'

const { REACT_APP_MONGO_HOSTING } = process.env

export const getAllTasks = async () => {
  const uri = `${REACT_APP_MONGO_HOSTING}/task/getAll`

  return await axios
    .get(uri)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const getOne = async (_id: string) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/task/getOne`

  return await axios
    .post(uri, { _id })
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const create = async (data: TTaskCreate) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/task/create`

  return await axios
    .post(uri, data)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const update = async (data: TTaskUpdate) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/task/update`

  return await axios
    .post(uri, data)
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}

export const remove = async (_id: string) => {
  const uri = `${REACT_APP_MONGO_HOSTING}/task/remove`

  return await axios
    .post(uri, { _id })
    .then((response) => response.data)
    .catch((error) => alert(error.response.data))
}
