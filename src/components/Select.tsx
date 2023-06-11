import { useState, useEffect } from 'react'
import { Select as MUISelect, SelectChangeEvent } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

import { selectApp } from '../redux/selectors'
import { darkTheme } from '../UI'
import { useAppContext } from '../context/Context'
import { User } from '../interfaces'

type Option = {
  label?: string
  value?: string | number
}

const sortOptions: Option[] = [
  { label: 'My tasks (open, expiring first)', value: '1' },
  { label: 'My tasks (all, newest first)', value: '2' },
  { label: 'All tasks (open, expiring first)', value: '3' },
  { label: 'All tasks (all, newest first)', value: '4' }
]

const sortBonusOption: Option[] = [{ label: 'Unsaved comments only', value: '5' }]

const statusOptions: Option[] = [
  { label: 'New', value: 'New' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' }
]

interface SelectProps {
  variant: string
  value: string
  label: string
  onChange: any // TODO
}

export const Select = ({ variant, value, onChange, label }: SelectProps) => {
  const { gotNewComments = false } = useAppContext()
  const { userlist } = useSelector(selectApp)
  const [options, setOptions] = useState<Option[]>([])
  const [userOptions, setUserOptions] = useState<Option[]>([])

  useEffect(() => {
    switch (variant) {
      case 'sort':
        const advancedOption: Option[] = [...sortOptions, ...sortBonusOption]
        const options: Option[] = gotNewComments ? advancedOption : sortOptions
        setOptions(options)
        break
      case 'status':
        setOptions(statusOptions)
        break
      case 'users':
        if (userOptions) {
          setOptions(userOptions)
        }
        break
      default:
        break
    }
  }, [userOptions, variant, gotNewComments])

  useEffect(() => {
    const array: Option[] = []
    userlist.forEach((user: User) => {
      const obj: Option = {}
      obj['label'] = user.name
      obj['value'] = user.uid
      array.push(obj)
    })
    setUserOptions(array)
  }, [userlist])

  const changeHandler = (e: SelectChangeEvent) => onChange(e.target.value)

  const clearHandler = () => onChange('')

  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        sx={{
          margin: '8px 0',
          width: '100%'
        }}
      >
        <InputLabel>{label}</InputLabel>
        {options.length > 0 && (
          <MUISelect
            sx={{ textAlign: 'left' }}
            value={value || ''}
            label={label}
            onChange={changeHandler}
            endAdornment={
              value &&
              variant === 'users' && (
                <IconButton
                  onClick={clearHandler}
                  sx={{ color: '#ddd', fontSize: '15px', right: '10px' }}
                >
                  <ClearIcon />
                </IconButton>
              )
            }
          >
            {options.map((option, index) => {
              const { label, value } = option
              return (
                <MenuItem key={index} value={value}>
                  {label}
                </MenuItem>
              )
            })}
          </MUISelect>
        )}
      </FormControl>
    </ThemeProvider>
  )
}
