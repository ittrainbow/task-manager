import { Button } from './Button'

const buttons = [
  { increment: -86400000, label: '-1 day' },
  { increment: -10800000, label: '-3 hr' },
  { increment: 10800000, label: '+3 hr' },
  { increment: 86400000, label: '+1 day' },
  { increment: 604800000, label: '+1 week' }
]

interface IButtonSetProps {
  deadline: number
  setDeadline: (value: number) => void
  variant: number
}

export const ButtonSet = ({ deadline, setDeadline, variant }: IButtonSetProps) => {
  const clicker = (increment: number) => setDeadline(deadline + increment)
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
