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