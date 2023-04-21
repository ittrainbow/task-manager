import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import './Dropdown.scss'

import { getFromUserlist } from '../../helpers'

const statusOptions = [{ name: 'New' }, { name: 'Open' }, { name: 'Closed' }]

export const DropdownMenu = ({ value, statusSelector, appointed, onChange }) => {
  const { userlist } = useSelector((store) => store.app)

  const list = statusSelector || !userlist ? statusOptions : userlist

  const dropdownHandler = ({ name, uid }) => onChange(statusSelector ? name : uid)

  const getDropdownHeader = () =>
    statusSelector ? value : appointed ? getFromUserlist({ userlist, uid: appointed }) : null
  const getDropdownElement = ({ name, uid }) =>
    statusSelector ? name : userlist ? getFromUserlist({ userlist, uid }) : null

  return (
    <Container className="dropdown-container">
      <div className="dropdown-header">{statusSelector ? 'Set status' : 'Appoint user'}</div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" style={{ height: '40px' }}>
          {getDropdownHeader()}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {list.map((option, index) => {
            const { name, uid } = option
            return (
              <Dropdown.Item key={index} onClick={() => dropdownHandler({ name, uid })}>
                {getDropdownElement({ name, uid })}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
