import moment from 'moment/moment'

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

export const taskListNameHelper = (name) => {
  return name.length > 40 ? name.substring(0, 37) + '...' : name
}

export const getFromUserlist = ({ userlist, uid }) => {
  if (!userlist || !uid) return 'not assigned'
  if (!userlist.some((el) => el.uid === uid)) return 'user deleted'
  return userlist.filter((el) => el.uid === uid)[0].name
}

export const convertMilliesToISO = (value) => {
  const ISOTime = moment(value).format().substring(0, 16)
  const readableTime = ISOTime.split('T').join(' ')
  return { ISOTime, readableTime }
}

export const sortTaskList = ({ taskSort, tasks, uid }) => {
  switch (taskSort) {
    case 0:
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
    case 1:
      const newTasksCase1 = tasks
        .filter((task) => {
          return task.creator === uid || task.assigned === uid
        })
        .sort((a, b) => {
          return b.id - a.id
        })
      return newTasksCase1
    case 2:
      const newTasksCase2 = tasks
        .filter((task) => {
          return task.status !== 'Closed'
        })
        .sort((a, b) => {
          return a.deadline - b.deadline
        })
      return newTasksCase2
    case 3:
      return tasks.sort((a, b) => {
        return b.id - a.id
      })
    default:
      break
  }
}
