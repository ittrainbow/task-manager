import dayjs from 'dayjs'

export const emptyTask = (uid) => {
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

export const taskListName = (name) => {
  return name.length > 40 ? name.substring(0, 37) + '...' : name
}

export const getFromUserlist = ({ userlist, uid }) => {
  if (!userlist || !uid) return '(not assigned)'
  if (!userlist.some((el) => el.uid === uid)) return 'user deleted'
  return userlist.filter((el) => el.uid === uid)[0].name
}

export const convertTime = (value) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm')
}

export const sortTaskList = ({ taskSort, tasks, uid, unsavedTasksIDs }) => {
  switch (taskSort) {
    case 1:
      const newTasksCase0 = tasks
        .filter((task) => {
          return task.creator === uid || task.assigned === uid
        })
        .filter((task) => {
          return task.status !== 'Closed'
        })
        .sort((a, b) => {
          return a.deadline - b.deadline
        })
      return newTasksCase0
    case 2:
      const newTasksCase1 = tasks
        .filter((task) => {
          return task.creator === uid || task.assigned === uid
        })
        .sort((a, b) => {
          return b.id - a.id
        })
      return newTasksCase1
    case 3:
      const newTasksCase2 = tasks
        .filter((task) => {
          return task.status !== 'Closed'
        })
        .sort((a, b) => {
          return a.deadline - b.deadline
        })
      return newTasksCase2
    case 4:
      return tasks.sort((a, b) => {
        return b.id - a.id
      })
    case 5:
      return tasks.filter((task) => unsavedTasksIDs.includes(task.id.toString()))
    default:
      break
  }
}

export const getOverflow = (variant) => {
  const querySelector = variant === 'tasks' ? '.tasklist__container' : '.comments__container'
  const diff = variant === 'tasks' ? 185 : 230
  const windowHeight = () => window.innerHeight
  const height = () => document.querySelector(querySelector).scrollHeight
  return windowHeight() - height() < diff
}

export const isAnyChanges = ({ selectedTask, assigned, status, yourComments, deadline }) => {
  const statusChanged = selectedTask.status !== status
  const assignedChanged = selectedTask.assigned !== assigned
  const deadlineChanged = selectedTask.deadline !== deadline
  const commentsChanged = yourComments.length
  const anyChanges = statusChanged || commentsChanged || assignedChanged || deadlineChanged
  return anyChanges
}
