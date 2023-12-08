import { useSelector } from 'react-redux'

import { selectContext, selectTask } from '../redux/selectors'

export const useComments = () => {
  const { tasks, selectedTaskId } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)
  const comments = tasks[selectedTaskId]?.comments || []
  const tempComments = newComments[selectedTaskId]?.comments || []
  const tempComment = newComments[selectedTaskId]?.comment || ''
  const allComments = comments.concat(tempComments)

  return { comments, tempComments, allComments, tempComment }
}
