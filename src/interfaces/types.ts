export type InputTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export type Action = {
  type: string
  payload?: any
}

export type InputProps = {
  value: string
  label: string
  type: 'text' | 'password'
  comments?: boolean
  rows?: number
  task?: boolean
  onChange: (e: InputTarget) => void
}
