import React, { useState, useEffect } from 'react'
import { Button, Input } from '.'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { getOverflow } from '../helpers'

export const Comments = ({ comments, yourComments, onSubmit, onDelete }) => {
  const [newComment, setNewComment] = useState('')
  const [newIndex, setNewIndex] = useState(0)
  const [overflow, setOverflow] = useState(false)

  useEffect(() => {
    const doc = document.querySelector('.MuiInputBase-inputMultiline')
    doc.focus()
  }, [yourComments])

  useEffect(() => {
    const paddingHelper = () => setOverflow(getOverflow())

    setTimeout(() => paddingHelper(), 20)
    window.addEventListener('resize', paddingHelper)
    return () => window.removeEventListener('resize', paddingHelper) // eslint-disable-next-line
  }, [yourComments])

  console.log(overflow)

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
    <div
      className="comments__container flexcol"
      style={{ paddingRight: overflow ? 5 : 0, minWidth: overflow ? 'calc(50% - 5px)' : 'calc(50% - 30px)' }}
    >
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        type="text"
        label={yourComments.length ? 'New comment' : 'Add first comment'}
        comments={true}
        multiline={true}
        minRows={2}
      />
      <Button onClick={submitComment} disabled={newComment.length === 0} label="Add comment" />
      {!list.length && <div className="no-comments">No comments yet</div>}
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
    </div>
  )
}
