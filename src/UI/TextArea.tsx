import '../styles/input.scss'
import { TextAreaTarget, InputProps } from '../interfaces'

interface InputPropsTextArea extends InputProps {
  onChange: (e: TextAreaTarget) => void
}

export const TextArea = ({ value, onChange, label, rows }: InputPropsTextArea) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      <textarea rows={rows} value={value} onChange={onChange} name="text" className="input" />
      <label className={labelClass}>{label}</label>
    </div>
  )
}
