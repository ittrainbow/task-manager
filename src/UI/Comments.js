import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { ReactComponent as Bin } from '../assets/trash-fill.svg'

export const Comments = ({ listOne, listTwo, onSubmitComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    document.querySelector('.comment__new').focus()
  }, [listTwo])

  const submitComment = () => {
    newComment.length > 0 && onSubmitComment(newComment)
    setNewComment('')
  }

  return (
    <div className="comments">
      {listOne.map((comment, index) => {
        return (
          <div key={index} className="comment">
            {comment}
          </div>
        )
      })}
      {listTwo.map((comment, index) => {
        return (
          <div key={index} className="comment" onClick={() => onDeleteComment(index)}>
            <div>{comment}</div>
            <div className="bin">
              <Bin />
            </div>
          </div>
        )
      })}
      <textarea
        className="comment__new"
        rows={4}
        value={newComment}
        placeholder="Add comment here"
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={submitComment} disabled={newComment.length === 0}>
        Add comment
      </Button>
    </div>
  )
}
