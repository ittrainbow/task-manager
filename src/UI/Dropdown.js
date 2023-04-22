import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getFromUserlist } from '../helpers'

const statusOptions = [{ name: 'New' }, { name: 'Open' }, { name: 'Closed' }]

export const DropdownMenu = ({ value, statusSelector, appointed, onChange }) => {
  const { userlist } = useSelector((store) => store.app)
  const list = statusSelector ? statusOptions : [{ name: 'no appointment', uid: null }, ...userlist]

  const dropdownHandler = ({ name, uid }) => onChange(statusSelector ? name : uid)

  const getDropdownHeader = () =>
    statusSelector ? value : appointed ? getFromUserlist({ userlist, uid: appointed }) : null
  const getDropdownElement = ({ name, uid }) =>
    statusSelector ? name : userlist && uid ? getFromUserlist({ userlist, uid }) : 'no appointment'

  const headerClass = !value && !statusSelector ? 'dropdown-header-notify' : 'dropdown-header'

  const headerText = statusSelector ? 'Set status' : 'Appoint user'

  return (
    <Container className="dropdown-container">
      <div className={headerClass}>{headerText}</div>
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
