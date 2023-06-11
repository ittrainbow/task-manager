export interface TaskFetch {
  comments?: string[]
  creator?: string
  deadline?: number
  description?: string
  assigned?: string
  id?: number
  lastmodified?: number
  name?: string
  status?: string
}

export interface Task {
  comments: string[]
  creator: string
  deadline: number
  description: string
  assigned: string
  id: number
  lastmodified: number
  name: string
  status: string
}

export interface User {
  name: string
  email: string
  uid: string
}

export interface Action {
  type: string
  payload?: any
}

export type EventTarget = React.ChangeEvent<HTMLInputElement>
