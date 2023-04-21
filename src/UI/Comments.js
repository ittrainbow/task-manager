import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export const Comments = ({ comments, onSubmitComment }) => {
  const [newComment, setNewComment] = useState('')

  const submitComment = () => {
    newComment.length > 0 && onSubmitComment(newComment)
    setNewComment('')
  }

  return (
    <div className="comments">
      {comments.map((comment, index) => {
        return (
          <div key={index} className="comment">
            {comment}
          </div>
        )
      })}
      <textarea
        className="comment__new"
        rows={4}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={submitComment}>Add comment</Button>
    </div>
  )
}
