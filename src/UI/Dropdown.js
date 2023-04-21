import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getFromUserlist } from '../helpers'

const statusOptions = [{ name: 'New' }, { name: 'Open' }, { name: 'Closed' }]
const appointToNoOne = { name: '... nobody', uid: null }

export const DropdownMenu = ({ value, statusSelector, appointed, onChange }) => {
  const { userlist } = useSelector((store) => store.app)
  value && !statusSelector && userlist[0].uid !== null && userlist.unshift(appointToNoOne)

  const list = statusSelector || !userlist ? statusOptions : userlist

  const dropdownHandler = ({ name, uid }) => onChange(statusSelector ? name : uid)

  const getDropdownHeader = () =>
    statusSelector ? value : appointed ? getFromUserlist({ userlist, uid: appointed }) : null
  const getDropdownElement = ({ name, uid }) =>
    statusSelector ? name : userlist ? getFromUserlist({ userlist, uid }) : null

  const headerClass =
    !value && !statusSelector ? 'dropdown-header dropdown-header__notify' : 'dropdown-header'

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
