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
import { getOptions } from '../helpers'
import { IUser, StatusValues, SortValues, DropdownVariants, Option } from '../interfaces'

interface SelectProps {
  variant: string
  value: string
  label: string
  onChange: (e: string) => void
}

export const Select = ({ variant, value, onChange, label }: SelectProps) => {
  const { gotNewComments } = useAppContext()
  const { userlist } = useSelector(selectApp)
  const [sortOptions, setSortOptions] = useState<Option[]>([])
  const [statusOptions, setStatusOptions] = useState<Option[]>([])
  const [userOptions, setUserOptions] = useState<Option[]>([])
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const getArray = (object: { [key: string]: string }, isSortMenu: boolean) => {
      return (Object.keys(object) as (keyof typeof object)[]).map((key, index) => {
        const value = isSortMenu ? (index + 1).toString() : object[key]
        return getOptions(object[key], value)
      })
    }
    userlist && setUserOptions(userlist.map((user: IUser) => getOptions(user.name, user.uid)))
    setSortOptions(getArray(SortValues, true))
    setStatusOptions(getArray(StatusValues, false)) // eslint-disable-next-line
  }, [userlist])

  useEffect(() => {
    switch (variant) {
      case DropdownVariants.sort:
        const options = sortOptions.slice(0, gotNewComments ? sortOptions.length : -1)
        setOptions(options)
        break
      case DropdownVariants.status:
        setOptions(statusOptions)
        break
      case DropdownVariants.assigned:
        if (userOptions) {
          setOptions(userOptions)
        }
        break
      default:
        break
    } // eslint-disable-next-line
  }, [userOptions, variant, gotNewComments])

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
        {options.length && (
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
