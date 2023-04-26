import React, { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Select as MUISelect } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'

import { darkTheme } from './themes'
import { selectApp } from '../redux/selectors'

const sortOptions = [
  { label: 'My tasks (open, expiring first)', value: 1 },
  { label: 'My tasks (all, newest first)', value: 2 },
  { label: 'All tasks (open, expiring first)', value: 3 },
  { label: 'All tasks (all, newest first)', value: 4 }
]

const statusOptions = [
  { label: 'New', value: 'New' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' }
]

export const Select = ({ variant, value, onChange, label }) => {
  const [options, setOptions] = useState()
  const [userOptions, setUserOptions] = useState()
  const { userlist } = useSelector(selectApp)

  useEffect(() => {
    switch (variant) {
      case 'sort':
        setOptions(sortOptions)
        break
      case 'status':
        setOptions(statusOptions)
        break
      case 'users':
        setOptions(userOptions)
        break
      default:
        break
    }
  }, [userOptions, variant])

  useEffect(() => {
    if (userlist) {
      const array = []
      userlist.forEach((user) => {
        const obj = {}
        obj.label = user.name
        obj.value = user.uid
        array.push(obj)
      })
      setUserOptions(array)
    }
  }, [userlist])

  const changeHandler = (e) => {
    const { value } = e.target
    onChange(value)
  }

  const clearHandler = () => {
    onChange('')
  }

  if (options)
    return (
      <ThemeProvider theme={darkTheme}>
        <FormControl sx={{ m: 1, minWidth: 120, background: 'none' }}>
          <InputLabel>{label}</InputLabel>
          <MUISelect
            sx={{ textAlign: 'left' }}
            value={value}
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
            {options &&
              options.map((option, index) => {
                const { label, value } = option
                return (
                  <MenuItem key={index} value={value}>
                    {label}
                  </MenuItem>
                )
              })}
          </MUISelect>
        </FormControl>
      </ThemeProvider>
    )
}
