import '../styles/input.scss'
import { InputTarget, InputProps } from '../interfaces'

interface InputPropsInput extends InputProps {
  onChange: (e: InputTarget) => void
}

export const Input = ({ value, type, onChange, label }: InputPropsInput) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <input type={type} value={value} onChange={onChange} name="text" className="input" />
      <label className={labelClass}>{label}</label>
    </div>
  )
}
