import { useSelector } from 'react-redux'
import { selectContext, selectTask } from '../redux/selectors'

type Props = { assigned: string | null; status: string; deadline: number }

export const useChanges = ({ assigned, status, deadline }: Props) => {
  const { tasks, selectedTaskId } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)
  const selectedTask = tasks[selectedTaskId]

  const statusChanged = selectedTask?.status !== status
  const assignedChanged = selectedTask?.assigned !== assigned
  const deadlineChanged = selectedTask?.deadline !== deadline
  const commentsChanged = newComments[selectedTaskId]?.comments?.length > 0

  return statusChanged || commentsChanged || assignedChanged || deadlineChanged
}
