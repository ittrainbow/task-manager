import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectContext, selectTask, selectUser } from '../redux/selectors'
import { TTask } from '../interfaces'

export const useSort = (): TTask[] => {
  const [list, setList] = useState([] as TTask[])
  const { tasks, taskSort } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)
  const { _id } = useSelector(selectUser)

  useEffect(() => {
    const tasklist = structuredClone(Object.values(tasks))

    if (taskSort === 'myOpen') {
      const list: TTask[] = tasklist
        .filter((task: TTask) => task.creator === _id || task.assigned === _id)
        .filter((task: TTask) => task.status !== 'closed')
        .sort((a: TTask, b: TTask) => a.deadline - b.deadline)
      setList(list)
    }

    if (taskSort === 'myAll') {
      const list: TTask[] = tasklist
        .filter((task: TTask) => task.creator === _id || task.assigned === _id)
        .sort((a: TTask, b: TTask) => {
          if (b._id > a._id) return 1
          if (b._id < a._id) return -1
          return 0
        })
      setList(list)
    }

    if (taskSort === 'allOpen') {
      const list: TTask[] = tasklist
        .filter((task: TTask) => task.status !== 'closed')
        .sort((a: TTask, b: TTask) => a.deadline - b.deadline)
      setList(list)
    }

    if (taskSort === 'allAll') {
      const list: TTask[] = tasklist.sort((a: TTask, b: TTask) => {
        if (b._id > a._id) return 1
        if (b._id < a._id) return -1
        return 0
      })
      setList(list)
    }

    if (taskSort === 'unsaved') {
      const unsavedTaskIDs = Object.keys(newComments)
      const list: TTask[] = tasklist.filter((task: TTask) => unsavedTaskIDs.includes(task._id.toString()))
      setList(list)
    }
    // eslint-disable-next-line
  }, [tasks, taskSort, _id])

  return list
}
