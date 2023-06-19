export interface ITask {
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

export interface IUser {
  name: string
  email: string
  uid: string
}