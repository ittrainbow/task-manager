import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from './Button'

export const DrawModal = ({ drawModal, setDrawModal, onDelete }) => {
  const handleClose = () => setDrawModal(false)

  const style={
    color: '#383c44',
    backgroundColor: 'white',
    gap: '5px'
  }

  return (
    <Modal show={drawModal} onHide={handleClose}>
      <Modal.Header closeButton style={style}>
        <Modal.Title style={style}>Task Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={style}>You're going to delete this task, are you sure?</Modal.Body>
      <Modal.Footer style={style}>
        <Button onClick={handleClose} value='Cancel' />
        <Button onClick={onDelete} value='Delete task' />
      </Modal.Footer>
    </Modal>
  )
}
