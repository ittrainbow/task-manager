import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export const Comments = ({ comments, onSubmitComment }) => {
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    document.querySelector('.comment__new').focus()
  }, [comments])

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
        placeholder="Add comment here"
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={submitComment} disabled={newComment.length === 0}>
        Add comment
      </Button>
    </div>
  )
}
