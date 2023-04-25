import React, { useState, useEffect } from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { getFromUserlist } from '../helpers'
import { selectApp } from '../redux/selectors'

export const DropdownUser = ({ value, assigned, onChange }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let timeout
    const getWidth = () => setWidth(document.getElementById('dropdown-basic user').offsetWidth)

    const userWidthListener = () => {
      clearTimeout(timeout)
      timeout = setTimeout(getWidth, 250)
    }

    value && getWidth()
    window.addEventListener('resize', userWidthListener)
    return () => window.removeEventListener('resize', userWidthListener)
  }, [value])

  const [search, setSearch] = useState('')
  const { userlist } = useSelector(selectApp)
  const options = [{ name: 'no assignment', uid: null }, ...userlist].filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container className="dropdown-container">
      <div className="dropdown-header">Assign User</div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic user">
          {getFromUserlist({ userlist, uid: assigned })}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-scroller" style={{ width }}>
          <div className="hs-searchbox">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="dropdown-divider"></div>
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
