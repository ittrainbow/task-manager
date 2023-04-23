import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getFromUserlist } from '../helpers'

export const DropdownUser = ({ value, appointed, onChange }) => {
  const { userlist } = useSelector((store) => store.app)
  const options = [{ name: 'no appointment', uid: null }, ...userlist]

  return (
    <Container className="dropdown-container-user">
      <div className="dropdown-header">Assign User</div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {getFromUserlist({ userlist, uid: appointed })}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, index) => {
            const { uid } = option
            const active = uid === value ? 'active' : ''
            return (
              <Dropdown.Item key={index} onClick={() => onChange(uid)} className={active}>
                {getFromUserlist({ userlist, uid })}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
