export type EventTarget = React.ChangeEvent<HTMLInputElement>
export type TextAreaTarget = React.ChangeEvent<HTMLTextAreaElement>
export type Option = { label: string; value: string }

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
}
