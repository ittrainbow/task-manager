import { SelectChangeEvent } from '@mui/material'

export type EventTarget = React.ChangeEvent<HTMLInputElement>
export type TextAreaTarget = React.ChangeEvent<HTMLTextAreaElement>
export type DropdownValue = SelectChangeEvent<string> | string
export type Option = { label: string; value: string }
