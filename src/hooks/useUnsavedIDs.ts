import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SET_UNSAVED_TASKS } from '../redux/types'
import { selectContext } from '../redux/selectors'

export const useUnsavedIDs = () => {
  const dispatch = useDispatch()
  const { newComments } = useSelector(selectContext)

  useEffect(() => {
    const IDs = Object.keys(newComments).filter((el) => newComments[el]?.comments?.length > 0)
    dispatch({ type: SET_UNSAVED_TASKS, payload: { IDs } })
    // eslint-disable-next-line
  }, [newComments])
}
