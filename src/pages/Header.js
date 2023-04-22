import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const headerButtons = [
  { name: 'Tasks', path: '/' },
  { name: 'Dashboard', path: '/dashboard' }
]

export const HeaderTab = () => {
  const navigate = useNavigate()

  return (
    <div className="header">
      {headerButtons.map((button, index) => {
        const { name, path } = button
        return (
          <Button key={index} onClick={() => navigate(path)} className="header__button-div">
            {name}
          </Button>
        )
      })}
    </div>
  )
}
