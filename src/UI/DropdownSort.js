import React, { useState, useEffect } from 'react'
import { Container, Dropdown } from 'react-bootstrap'

const options = [
  { name: 'My (open, expiring first)', value: 0 },
  { name: 'My (all, newest first)', value: 1 },
  { name: 'All (open, expiring first)', value: 2 },
  { name: 'All (all, newest first)', value: 3 }
]

export const DropdownSort = ({ value, onChange }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let timeout
    const getWidth = () => setWidth(document.getElementById('dropdown-basic sort').offsetWidth)

    const sortWidthListener = () => {
      clearTimeout(timeout)
      timeout = setTimeout(getWidth, 250)
    }

    getWidth()
    window.addEventListener('resize', sortWidthListener)
    return () => window.removeEventListener('resize', sortWidthListener)
  }, [])

  const dropdownHandler = (name) => onChange(name)
  const dropdownName = options.filter((option) => option.value === value)[0].name

  return (
    <Container className="dropdown-container">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic sort" className="dropdown-basic">
          {dropdownName}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: width }}>
          {options.map((option, index) => {
            const { name } = option
            const active = option.value === value ? 'active' : ''
            return (
              <Dropdown.Item key={index} onClick={() => dropdownHandler(option)} className={active}>
                {name}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
