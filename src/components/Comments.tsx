import { useEffect } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'

import { Button, TextArea } from '../UI'
import { useAppContext } from '../context/Context'
import { selectTask } from '../redux/selectors'
import { ITask } from '../interfaces'

export const Comments = () => {
  const { selectedTaskId, tasks } = useSelector(selectTask)
  const { newComments, setComments, deleteComments, tempComments, setTempComment } = useAppContext()

  const yourComments: string[] = newComments[selectedTaskId] || []
  const tempComment: string = tempComments[selectedTaskId] || ''

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc && doc.focus()
  }, [newComments])

  const findTask = tasks.find((task: ITask) => task.id === selectedTaskId) as ITask
  const comments = findTask.comments as string[]

  const submitComment = () => {
    setComments(tempComment)
    setTempComment('')
  }

  const deleteCommentHandler = (index: number) => {
    const tempClass = 'animate-delete-comment'
    const commentsHtml = document.getElementsByClassName('new-comment') as HTMLCollectionOf<Element>
    commentsHtml[index].classList.add(tempClass)
    setTimeout(() => {
      commentsHtml[index].classList.remove(tempClass)
      deleteComments(index)
    }, 250)
  }

  const changeCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target
    setTempComment(value)
  }

  return (
    <>
      {[...yourComments, ...comments].length < 1 && (
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
        <Button onClick={submitComment} disabled={tempComment.length < 1} label="Add comment" />
      </div>
    </>
  )
}
