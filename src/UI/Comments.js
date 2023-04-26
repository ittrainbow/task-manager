import React, { useState, useEffect } from 'react'
import { Button, Input } from '.'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Comments = ({ listOne, listTwo, onSubmitComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const doc = document.querySelector('.MuiInputBase-inputMultiline')
    doc.focus()
  }, [listTwo])

  const submitComment = () => {
    newComment.length > 0 && onSubmitComment(newComment)
    setNewComment('')
  }

  return (
    <div className="flexcol15" id="comments-container">
      <div className="flexcol">
        {![...listOne, ...listTwo].length && <div className="no-comments">No comments yet</div>}
        {listOne.map((comment, index) => {
          return (
            <div key={index} className="comment__container">
              {comment}
            </div>
          )
        })}
        {listTwo.map((comment, index) => {
          return (
            <div key={index} className="comment__container flexrow">
              <div>{comment}</div>
              <div className="bin" onClick={() => onDeleteComment(index)}>
                <DeleteForeverIcon />
              </div>
            </div>
          )
        })}
      </div>
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        type="text"
        label="New comment"
        comments={true}
        multiline={true}
        minRows={3}
      />
      <Button onClick={submitComment} disabled={newComment.length === 0} value="Add comment" />
    </div>
  )
}
