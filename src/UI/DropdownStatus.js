import React  from 'react'
import { Container, Dropdown } from 'react-bootstrap'

export const DropdownStatus = ({ value, onChange }) => {
  const options = ['New', 'Open', 'Closed']
  const dropdownHandler = (option) => onChange(option)

  return (
    <Container className="dropdown-container-status">
      <div className="dropdown-header">Set Status</div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="dropdown-basic">
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, index) => {
            const active = option === value ? 'active' : ''
            return (
              <Dropdown.Item
                key={index}
                onClick={() => dropdownHandler(option)}
                className={active}
              >
                {option}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
