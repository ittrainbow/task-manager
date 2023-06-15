import { useState, useEffect, useContext, createContext, Dispatch, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectTask, selectUser } from '../redux/selectors'
import { SET_TASK_SORT } from '../redux/types'

type NewCommentsType = { [key: number]: string[] }
type TempCommentsType = { [key: number]: string }

type ContextType = {
  selectedTaskIsOnList: boolean
  setSelectedTaskIsOnList: Dispatch<SetStateAction<boolean>>
  selectedTab: number
  setSelectedTab: Dispatch<SetStateAction<number>>
  assigned: string
  setAssigned: Dispatch<SetStateAction<string>>
  status: string
  setStatus: (value: string) => void
  newComments: NewCommentsType
  tempComments: TempCommentsType
  gotNewComments: boolean
  unsavedTasksIDs: string[]
  setComments: (comments: string) => void
  deleteComments: (index: number) => void
  setTempComment: (value: string) => void
  cleanCommentsOnSave: (id: number) => void
}

type ContextChildren = {
  children: React.ReactNode
}

const Context = createContext<ContextType>({} as ContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextChildren) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(selectUser)
  const { selectedTaskId } = useSelector(selectTask)

  const [selectedTaskIsOnList, setSelectedTaskIsOnList] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [status, setStatus] = useState<string>('New')
  const [assigned, setAssigned] = useState<string>(uid)
  const [newComments, setNewComments] = useState<NewCommentsType>({} as NewCommentsType)
  const [tempComments, setTempComments] = useState<TempCommentsType>({} as TempCommentsType)
  const [unsavedTasksIDs, setUnsavedTasksIDs] = useState<string[]>([])

  const cleanCommentsOnSave = (id: number) => {
    const tempObject: { [key: number]: string[] } = { ...newComments }
    delete tempObject[id]
    !Object.keys(tempObject).length && resetSort()
    setNewComments(tempObject)
  }

  useEffect(() => {
    const IDs: string[] = Object.keys(newComments)
    setUnsavedTasksIDs(IDs)
  }, [newComments])

  const setComments = (comment: string) => {
    const tempObject: { [key: number]: string[] } = { ...newComments }
    const tempComments = tempObject[selectedTaskId] || []
    tempComments.push(comment)
    tempObject[selectedTaskId] = tempComments
    setNewComments(tempObject)
  }

  const resetSort = () => {
    dispatch({
      type: SET_TASK_SORT,
      payload: '1'
    })
  }

  const deleteComments = (index: number) => {
    const tempObject: { [key: number]: string[] } = { ...newComments }
    const tempComments: string[] = tempObject[selectedTaskId]
    tempComments.splice(index, 1)
    if (tempComments.length) {
      tempObject[selectedTaskId] = tempComments
    } else {
      delete tempObject[selectedTaskId]
    }
    if (!Object.keys(tempObject).length) {
      resetSort()
    }
    setNewComments(tempObject)
  }

  const setTempComment = (value: string) => {
    const tempObject: { [key: number]: string } = { ...tempComments }
    tempObject[selectedTaskId] = value
    setTempComments(tempObject)
  }

  const gotNewComments: boolean = Object.keys(newComments).length > 0

  return (
    <Context.Provider
      value={{
        selectedTaskIsOnList,
        setSelectedTaskIsOnList,
        selectedTab,
        setSelectedTab,
        assigned,
        setAssigned,
        status,
        setStatus,
        newComments,
        setComments,
        deleteComments,
        tempComments,
        setTempComment,
        gotNewComments,
        unsavedTasksIDs,
        cleanCommentsOnSave
      }}
    >
      {children}
    </Context.Provider>
  )
}
