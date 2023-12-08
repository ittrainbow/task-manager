export type InputTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export type TActionProps = {
  type: string
  payload?: any
}

export type InputProps = {
  value: string
  label: string
  type: 'text' | 'password'
  comments?: boolean
  rows?: number
  task?: boolean
  onChange: (e: InputTarget) => void
}

export type TAction<T> = {
  type: string
  payload: T
}

export type TLogin = {
  name: string
  email: string
}

export type TSignup = TLogin & {
  password: string
}

export type TUser = {
  token?: string
  name: string
  email: string
  _id: string
}
export type TUserUpdate = {
  email: string
  _id: string
}

export type TTask = {
  comments: string[]
  creator: string
  deadline: number
  description: string
  assigned: string | null
  _id: string
  created: number
  modified: number
  name: string
  status: string
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type TTempTask = PartialBy<TTask, '_id'>

export type TCreateTaskResponse = {
  acknowledged: boolean
  insertedId: string
  time: number
}

export type TUpdateTaskResponse = {
  modified: number
}

export type TTaskCreate = Omit<TTask, 'created' | 'modified' | '_id'>
export type TTaskUpdate = Pick<TTask, 'comments' | 'assigned' | 'deadline' | 'status' | '_id'>

export type TAppStore = {
  loading: boolean
  userlist: TUser[]
  error: string | null
}

export type TTaskStore = {
  _id: string
  newTask: boolean
  selectedTaskId: string
  taskSort: string
  tasks: Record<string, TTask>
}

export type TUserStore = {
  email: string
  name: string
  _id: string
}

export type TComments = Record<string, { comments: string[]; comment: string }>

export type TContextStore = {
  selectedTab: number
  assigned: string | null
  status: string
  newComments: TComments
  unsavedTaskIDs: string[]
}

export type TStore = {
  app: TAppStore
  task: TTaskStore
  user: TUserStore
  context: TContextStore
}
