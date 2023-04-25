import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export const DrawModal = ({ drawModal, setDrawModal, onDelete }) => {
  const handleClose = () => setDrawModal(false)

  const style={
    color: '#383c44',
    backgroundColor: '#c7c7c7'
  }

  return (
    <Modal show={drawModal} onHide={handleClose}>
      <Modal.Header closeButton style={style}>
        <Modal.Title style={style}>Task Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={style}>You're going to delete this task, are you sure?</Modal.Body>
      <Modal.Footer style={style}>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
