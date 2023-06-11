import '../styles/input.scss'

interface InputProps {
  value: string
  onChange: any
  label: string
  type: string
  rows?: number
  comments?: boolean
  task?: boolean
}

export const Input = ({ value, type, onChange, label, rows = 1 }: InputProps) => {
  const labelClass = value ? 'user-label-up' : 'user-label'

  return (
    <div className="input-group">
      {rows > 1 ? (
        <textarea value={value} onChange={onChange} name="text" className="input" />
      ) : (
        <input type={type} value={value} onChange={onChange} name="text" className="input" />
      )}
      <label className={labelClass}>{label}</label>
    </div>
  )
}
