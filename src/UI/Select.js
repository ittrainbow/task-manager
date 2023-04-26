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
  { label: 'My (open, expiring first)', value: 1 },
  { label: 'My (all, newest first)', value: 2 },
  { label: 'All (open, expiring first)', value: 3 },
  { label: 'All (all, newest first)', value: 4 }
]

const statusOptions = [
  { label: 'New', value: 'New' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' }
]

export const Select = ({ variant, value, onChange, label }) => {
  console.log(13, value)
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
    console.log(11, value)
    onChange(value)
  }

  const clearHandler = () => {
    onChange(null)
  }

  if (options)
    return (
      <ThemeProvider theme={darkTheme}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>{label}</InputLabel>
          <MUISelect
            value={value}
            label={label}
            onChange={changeHandler}
            endAdornment={
              value &&
              variant === 'users' && (
                <IconButton onClick={clearHandler}>
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
