import React, { useState, useEffect } from 'react'
import { Button, Input } from '.'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Comments = ({ comments, yourComments, onSubmit, onDelete }) => {
  const [newComment, setNewComment] = useState('')
  const [newIndex, setNewIndex] = useState(0)

  useEffect(() => {
    const doc = document.querySelector('.MuiInputBase-inputMultiline')
    doc.focus()
  }, [yourComments])

  const submitComment = () => {
    newComment.length > 0 && onSubmit(newComment)
    setNewComment('')
    setNewIndex(newIndex + 1)
  }

  const deleteCommemtHandler = (index) => {
    const tempClass = 'animate-delete-comment'
    const comments = document.getElementsByClassName('new-comment')
    const div = comments[index]
    div.classList.add(tempClass)
    setTimeout(() => {
      div.classList.remove(tempClass)
      onDelete(index)
    }, 250)
  }

  const list = [...comments, ...yourComments]

  return (
    <>
      {!list.length && (
        <div
          className="new-comment comment__container animate-add-comment"
          style={{ color: 'grey' }}
        >
          No comments yet
        </div>
      )}
      {comments.map((comment, index) => {
        return (
          <div key={index} className="comment__container">
            {comment}
          </div>
        )
      })}
      {yourComments.map((comment, index) => {
        return (
          <div key={index} className="comment__container flexrow animate-add-comment new-comment">
            <div>{comment}</div>
            <div className="bin" onClick={() => deleteCommemtHandler(index)}>
              <DeleteForeverIcon />
            </div>
          </div>
        )
      })}
      <div className="flexcol" style={{ paddingTop: '10px' }}>
        <Input
          value={newComment}
          type="text"
          label={yourComments.length ? 'New comment' : 'Add first comment'}
          comments={true}
          multiline={true}
          minRows={2}
        />
        <Button onClick={submitComment} disabled={newComment.length === 0} label="Add comment" />
      </div>
    </>
  )
}
