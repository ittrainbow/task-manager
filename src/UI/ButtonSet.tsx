// import React from 'react'
import { Button } from './Button'

const buttons = [
  { increment: -86400000, label: '-1 day' },
  { increment: -10800000, label: '-3 hr' },
  { increment: 10800000, label: '+3 hr' },
  { increment: 86400000, label: '+1 day' },
  { increment: 604800000, label: '+1 week' }
]

interface ButtonSetProps {
  deadline: number
  setDeadline: any // TODO
  variant: number
}

type Increment = number

export const ButtonSet = ({ deadline, setDeadline, variant }: ButtonSetProps) => {
  const clicker = (increment: Increment) => setDeadline(deadline + increment)
  const arr = variant === 5 ? buttons : [...buttons].splice(1, 3)

  return (
    <div className="flexrow" id="button-set">
      {arr.map((button, index) => {
        const { increment, label } = button
        return <Button key={index} onClick={() => clicker(increment)} label={label} />
      })}
    </div>
  )
}
