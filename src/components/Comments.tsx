import React, { useEffect } from 'react'
import { Button, Input } from '../UI'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'

import { useAppContext } from '../context/Context'
import { selectTask } from '../redux/selectors'
import { EventTarget, Task } from '../interfaces'

export const Comments = () => {
  const { selectedTaskId, tasks } = useSelector(selectTask)
  const { newComments, setComments, deleteComments, tempComments, setTempComment } = useAppContext()

  const yourComments = newComments[selectedTaskId] || []
  const tempComment = tempComments[selectedTaskId] || ''

  useEffect(() => {
    const doc = document.querySelector('.input') as HTMLElement
    doc.focus()
  }, [newComments])

  const { comments } = tasks.find((task: Task) => {
    return task.id === selectedTaskId
  }) // TODO

  const submitComment = () => {
    setComments(tempComment)
    setTempComment('')
  }

  const deleteCommentHandler = (index: number) => {
    const tempClass = 'animate-delete-comment'
    const comments = document.getElementsByClassName('new-comment')
    const div = comments[index]
    div.classList.add(tempClass)
    setTimeout(() => {
      div.classList.remove(tempClass)
      deleteComments(index)
    }, 250)
  }

  const changeCommentHandler = (e: EventTarget) => {
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
        <Input
          value={tempComment}
          type="text"
          label={yourComments.length ? 'New comment' : 'Add first comment'}
          comments={true}
          rows={2}
          onChange={changeCommentHandler}
          task={true}
        />
        <Button onClick={submitComment} disabled={!tempComment.length} label="Add comment" />
      </div>
    </>
  )
}
