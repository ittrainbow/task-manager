import dayjs from 'dayjs'

import { Task, User, Option } from '../interfaces'

export const emptyTask = (uid: string) => {
  return {
    creator: uid,
    id: new Date().getTime(),
    lastmodified: new Date().getTime(),
    comments: [],
    name: '',
    description: '',
    deadline: new Date().getTime(),
    status: 'New',
    assigned: uid
  }
}

export const taskListName = (name: string) => {
  return name.length > 40 ? name.substring(0, 37) + '...' : name
}

type getFromUserlistProps = {
  userlist: User[]
  uid: string
}

export const getFromUserlist = (props: getFromUserlistProps) => {
  const { userlist, uid } = props
  if (!userlist || !uid) return '(not assigned)'
  if (!userlist.some((el) => el.uid === uid)) return 'user deleted'
  const name: string | undefined = userlist.find((el) => el.uid === uid)?.name
  return name
}

export const convertTime = (value: number) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm')
}

export const getOverflow = (variant: string) => {
  const querySelector: string =
    variant === 'tasks' ? '.tasklist__container' : '.comments__container'
  const diff: number = variant === 'tasks' ? 185 : 230
  const windowHeight = (): number => window.innerHeight
  const height = (): number =>
    document.querySelector(querySelector)
      ? (document.querySelector(querySelector) as HTMLElement).scrollHeight
      : 0
  return windowHeight() - height() < diff
}

type isAnyChangesProps = {
  selectedTask: Task
  assigned: string
  status: string
  yourComments: string[]
  deadline: number
}

export const isAnyChanges = ({
  selectedTask,
  assigned,
  status,
  yourComments,
  deadline
}: isAnyChangesProps) => {
  const statusChanged = selectedTask.status !== status
  const assignedChanged = selectedTask.assigned !== assigned
  const deadlineChanged = selectedTask.deadline !== deadline
  const commentsChanged = yourComments.length > 0
  const anyChanges = statusChanged || commentsChanged || assignedChanged || deadlineChanged
  return anyChanges
}

export const getOptions = (label: string, value: string) => {
  const obj: Option = {} as Option
  obj['label'] = label
  obj['value'] = value
  return obj
}
