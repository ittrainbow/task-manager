import { useEffect } from 'react'
import { Button, TextArea } from '../UI'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'

import { useAppContext } from '../context/Context'
import { selectTask } from '../redux/selectors'
import { TextAreaTarget, Task } from '../interfaces'

export const Comments = () => {
  const { selectedTaskId, tasks } = useSelector(selectTask)
  const { newComments, setComments, deleteComments, tempComments, setTempComment } = useAppContext()

  const yourComments = newComments[selectedTaskId] || []
  const tempComment = tempComments[selectedTaskId] || ''

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc.focus()
  }, [newComments])

  const findTask = tasks.find((task: Task) => task.id === selectedTaskId)

  const comments = findTask ? findTask.comments : []

  const submitComment = () => {
    setComments(tempComment)
    setTempComment('')
  }

  const deleteCommentHandler = (index: number) => {
    const tempClass = 'animate-delete-comment'
    const comments: HTMLCollectionOf<Element> = document.getElementsByClassName('new-comment')
    const div = comments[index]
    div.classList.add(tempClass)
    setTimeout(() => {
      div.classList.remove(tempClass)
      deleteComments(index)
    }, 250)
  }

  const changeCommentHandler = (e: TextAreaTarget) => {
    const { value } = e.target
    setTempComment(value)
  }

  return (
    <>
      {![...comments, ...yourComments].length && (
        <div className="new-comment comment__container" style={{ color: 'grey' }}>
          No comments yet
        </div>
      )}
      {comments.map((comment: string, index: number) => {
        return (
          <div key={index} className="comment__container">
            {comment}
          </div>
        )
      })}
      {yourComments.map((comment: string, index: number) => {
        return (
          <div key={index} className="comment__container flexrow animate-add-comment new-comment">
            <div>{comment}</div>
            <div className="bin" onClick={() => deleteCommentHandler(index)}>
              <DeleteForeverIcon />
            </div>
          </div>
        )
      })}
      <div className="flexcol" style={{ paddingTop: '10px' }}>
        <TextArea
          value={tempComment}
          type="text"
          label={yourComments.length ? 'New comment' : 'Add first comment'}
          rows={3}
          onChange={changeCommentHandler}
          task={true}
        />
        <Button onClick={submitComment} disabled={!tempComment.length} label="Add comment" />
      </div>
    </>
  )
}
