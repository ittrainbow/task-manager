import React, { useState, useEffect } from 'react'
import { Container, Dropdown } from 'react-bootstrap'

const options = ['New', 'Open', 'Closed']

export const DropdownStatus = ({ value, onChange }) => {
  const [width, setWidth] = useState(0)
  const dropdownHandler = (option) => onChange(option)

  useEffect(() => {
    let timeout
    const getWidth = () => setWidth(document.getElementById('dropdown-basic status').offsetWidth)

    const statusWidthListener = () => {
      clearTimeout(timeout)
      timeout = setTimeout(getWidth, 250)
    }

    getWidth()
    window.addEventListener('resize', statusWidthListener)
    return () => window.removeEventListener('resize', statusWidthListener)
  }, [value])

  return (
    <Container className="dropdown-container">
      <div className="dropdown-header">Set Status</div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic status" className="dropdown-basic">
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width }}>
          {options.map((option, index) => {
            const active = option === value ? 'active' : ''
            return (
              <Dropdown.Item key={index} onClick={() => dropdownHandler(option)} className={active}>
                {option}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}
