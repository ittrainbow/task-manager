import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'

export const DropdownSort = ({ value, onChange }) => {
  const options = [
    { name: 'My tasks (expiring first)', value: 0 },
    { name: 'My tasks', value: 1 },
    { name: 'All tasks (expiring first)', value: 2 },
    { name: 'All tasks', value: 3 }
  ]

  const dropdownHandler = (name) => onChange(name)
  const dropdownName = options.filter((option) => option.value === value)[0].name

  return (
    <Container className="dropdown-container-sort">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="dropdown-basic">
          {dropdownName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, index) => {
            const { name } = option
            const active = option.value === value ? 'active' : ''
            return (
              <Dropdown.Item
                key={index}
                onClick={() => dropdownHandler(option)}
                className={active}
              >
                {name}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
