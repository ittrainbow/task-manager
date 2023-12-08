import '../styles/input.scss'
import { InputProps } from '../interfaces'

export const Input = ({ value, type, onChange, label }: InputProps) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <input type={type} value={value} onChange={onChange} name="text" className="input" />
      <label className={labelClass}>{label}</label>
    </div>
  )
}
