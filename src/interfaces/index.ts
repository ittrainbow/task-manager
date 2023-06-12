import { SelectChangeEvent } from '@mui/material'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

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

export interface InputProps {
  value: string
  label: string
  type: string
  comments?: boolean
  rows?: number
  task?: boolean
}

export type EventTarget = React.ChangeEvent<HTMLInputElement>
export type TextAreaTarget = React.ChangeEvent<HTMLTextAreaElement>
export type DropdownValue = SelectChangeEvent<string> | string
// export type FetchDoc = QueryDocumentSnapshot<DocumentData>
// export type 