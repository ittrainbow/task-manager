import { ITask } from '../interfaces'

type sortTaskListProps = {
  taskSort: string
  tasks: ITask[]
  uid: string
  unsavedTasksIDs: string[]
}

export const sortTaskList = ({ taskSort, tasks, uid, unsavedTasksIDs }: sortTaskListProps) => {
  switch (taskSort) {
    case '1':
      const newTasksCase1: ITask[] = tasks
        .filter((task) => {
          return task.creator === uid || task.assigned === uid
        })
        .filter((task) => {
          return task.status !== 'Closed'
        })
        .sort((a, b) => {
          return a.deadline - b.deadline
        })
      return newTasksCase1
    case '2':
      const newTasksCase2: ITask[] = tasks
        .filter((task) => {
          return task.creator === uid || task.assigned === uid
        })
        .sort((a, b) => {
          return b.id - a.id
        })
      return newTasksCase2
    case '3':
      const newTasksCase3: ITask[] = tasks
        .filter((task) => {
          return task.status !== 'Closed'
        })
        .sort((a, b) => {
          return a.deadline - b.deadline
        })
      return newTasksCase3
    case '4':
      const newTasksCase4: ITask[] = tasks.sort((a, b) => {
        return b.id - a.id
      })
      return newTasksCase4
    case '5':
      const newTasksCase5: ITask[] = tasks.filter((task) =>
        unsavedTasksIDs.includes(task.id.toString())
      )
      return newTasksCase5
    default:
      return tasks
  }
}
