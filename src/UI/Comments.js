import React, { useState, useEffect } from 'react'
import { Button, Input } from '.'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Comments = ({ comments, yourComments, onSubmit, onDelete, overflow }) => {
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
    <div className="flexcol15" id="comments-container">
      <div className="flexcol comments-div">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type="text"
          label={yourComments.length ? 'New comment' : 'Add first comment'}
          comments={true}
          multiline={true}
          minRows={2}
        />
        <Button onClick={submitComment} disabled={newComment.length === 0} value="Add comment" />
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
    </div>
  )
}
