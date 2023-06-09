export interface Task {
  comments?: string[]
  creator?: string
  deadline?: number
  description?: string
  id?: number
  lastmodified?: number
  name?: string
  status?: string
}

export interface User {
  name: string
  email: string
  uid: string
}

export type EventTarget = React.ChangeEvent<HTMLInputElement>
export type DropdownValue = string | number