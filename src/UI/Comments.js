import React, { useState, useEffect } from 'react'
import { Button, Input } from '.'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const Comments = ({ listOne, listTwo, onSubmitComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('')
  const [newIndex, setNewIndex] = useState(0)

  useEffect(() => {
    const doc = document.querySelector('.MuiInputBase-inputMultiline')
    doc.focus()
  }, [listTwo])

  const submitComment = () => {
    newComment.length > 0 && onSubmitComment(newComment)
    setNewComment('')
    setNewIndex(newIndex + 1)
  }

  const helper = (index) => {
    const tempClass = 'animate-delete-comment'
    const comments = document.getElementsByClassName('new-comment')
    const div = comments[index]
    div.classList.add(tempClass)
    setTimeout(() => {
      div.classList.remove(tempClass)
      onDeleteComment(index)
    }, 300)
  }

  return (
    <div className="flexcol15" id="comments-container">
      <div className="flexcol comments-div">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type="text"
          label={listTwo.length ? 'New comment' : 'Add first comment'}
          comments={true}
          multiline={true}
          minRows={2}
        />
        <Button onClick={submitComment} disabled={newComment.length === 0} value="Add comment" />
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
            <div
              key={index}
              className={`new-comment ${newIndex.toString()} comment__container flexrow animate-add-comment`}
            >
              <div>{comment}</div>
              {/* <div className="bin" onClick={() => onDeleteComment(index)}> */}
              <div className="bin" onClick={() => helper(index)}>
                <DeleteForeverIcon />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
