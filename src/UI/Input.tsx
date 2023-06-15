import '../styles/input.scss'
import { EventTarget, InputProps } from '../interfaces'

interface InputPropsInput extends InputProps {
  onChange: (e: EventTarget) => void
}

export const Input = ({ value, type, onChange, label }: InputPropsInput) => {
  console.log(type)
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <input type={type} value={value} onChange={onChange} name="text" className="input" />
      <label className={labelClass}>{label}</label>
    </div>
  )
}
