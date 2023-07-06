import '../styles/input.scss'
import { InputProps } from '../interfaces'

export const TextArea = ({ value, onChange, label, rows }: InputProps) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <textarea rows={rows} value={value} onChange={onChange} name="text" className="input" />
      <label className={labelClass}>{label}</label>
    </div>
  )
}
