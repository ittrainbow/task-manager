import dayjs from 'dayjs'

import { TTempTask, TUser } from '../interfaces'

export const emptyTask = (_id: string): TTempTask => {
  return {
    creator: _id,
    created: new Date().getTime(),
    modified: new Date().getTime(),
    comments: [],
    name: '',
    description: '',
    deadline: new Date().getTime(),
    status: 'new',
    assigned: _id
  }
}

export const taskListName = (name: string) => (name.length > 40 ? name.substring(0, 37) + '...' : name)

export const getFromUserlist = (props: { userlist: TUser[]; _id: string }) => {
  const { userlist, _id } = props
  if (!userlist || !_id) return '(not assigned)'
  if (!userlist.some((el) => el._id === _id)) return 'user deleted'
  const name = userlist.find((el) => el._id === _id)?.name
  return name as string
}

export const convertTime = (value: number) => dayjs(value).format('YYYY-MM-DD HH:mm')

export const getOverflow = (variant: string) => {
  const querySelector = variant === 'tasks' ? '.tasklist__container' : '.comments__container'
  const diff = variant === 'tasks' ? 185 : 230
  const windowHeight = () => window.innerHeight
  const height = () =>
    document.querySelector(querySelector) ? (document.querySelector(querySelector) as HTMLElement).scrollHeight : 0
  const result = windowHeight() - height() < diff
  return result
}

export const getOptions = (label: string, value: string) => {
  const obj = { label: '', value: '' }
  obj.label = label
  obj.value = value
  return obj
}

export const sortValues: Record<string, string> = {
  myOpen: 'My tasks (open, expiring first)',
  myAll: 'My tasks (all, newest first)',
  allOpen: 'All tasks (open, expiring first)',
  allAll: 'All tasks (all, newest first)',
  unsaved: 'Unsaved comments only'
}

export const statusValues: Record<string, string> = {
  new: 'New',
  open: 'Open',
  closed: 'Closed'
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
