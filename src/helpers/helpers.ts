import dayjs from 'dayjs'

export const emptyTask = (uid: string) => {
  return {
    creator: uid,
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
  userlist: { [key: string]: string }[]
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
  const querySelector = variant === 'tasks' ? '.tasklist__container' : '.comments__container'
  const diff = variant === 'tasks' ? 185 : 230
  const windowHeight = () => window.innerHeight
  const height = () =>
    document.querySelector(querySelector)
      ? (document.querySelector(querySelector) as HTMLElement).scrollHeight
      : 0
  return windowHeight() - height() < diff
}

type isAnyChangesProps = {
  selectedTask: any
  assigned: any
  status: any
  yourComments: any
  deadline: number
}

export const isAnyChanges = (props: isAnyChangesProps) => {
  const { selectedTask, assigned, status, yourComments, deadline } = props
  const statusChanged = selectedTask.status !== status
  const assignedChanged = selectedTask.assigned !== assigned
  const deadlineChanged = selectedTask.deadline !== deadline
  const commentsChanged = yourComments.length
  const anyChanges = statusChanged || commentsChanged || assignedChanged || deadlineChanged
  return anyChanges
}
