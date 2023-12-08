import { useEffect } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_TEMP_COMMENT, REMOVE_TEMP_COMMENT, SET_TEMP_COMMENT } from '../redux/types'
import { selectContext, selectTask } from '../redux/selectors'
import { Button, TextArea } from '../UI'
import { useComments } from '../hooks'

export const Comments = () => {
  const dispatch = useDispatch()
  const { selectedTaskId } = useSelector(selectTask)
  const { newComments } = useSelector(selectContext)
  const { comments, tempComments, tempComment } = useComments()

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc && doc.focus()
  }, [newComments])

  const deleteCommentHandler = (index: number) => {
    const commentsHtml = document.getElementsByClassName('new-comment') as HTMLCollectionOf<Element>
    commentsHtml[index].classList.add('animate-delete-comment')
    setTimeout(() => {
      commentsHtml[index].classList.remove('animate-delete-comment')
      dispatch({ type: REMOVE_TEMP_COMMENT, payload: { index, selectedTaskId } })
    }, 250)
  }

  const taskComments = [...comments, ...tempComments]

  const tempCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: SET_TEMP_COMMENT, payload: { selectedTaskId, value } })
  }

  const addCommentHandler = () => dispatch({ type: ADD_TEMP_COMMENT, payload: { selectedTaskId } })

  return (
    <>
      {taskComments.length < 1 && (
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
      {tempComments.map((comment: string, index: number) => {
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
          label={taskComments.length ? 'New comment' : 'Add first comment'}
          rows={3}
          onChange={tempCommentHandler}
          task={true}
        />
        <Button onClick={addCommentHandler} disabled={tempComment.length < 1} label="Add comment" />
      </div>
    </>
  )
}
