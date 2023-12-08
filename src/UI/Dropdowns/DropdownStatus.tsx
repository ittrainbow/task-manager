import { useDispatch, useSelector } from 'react-redux'

import { Select, SelectChangeEvent, InputLabel, MenuItem, FormControl } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { selectContext } from '../../redux/selectors'
import { SET_STATUS } from '../../redux/types'
import { statusValues } from '../../helpers'
import { darkTheme } from '../themes'

export const DropdownStatus = () => {
  const { status } = useSelector(selectContext)
  const dispatch = useDispatch()

  const onChangeHandler = (e: SelectChangeEvent) => {
    dispatch({ type: SET_STATUS, payload: { status: e.target.value } })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        sx={{
          margin: '8px 0',
          width: '100%'
        }}
      >
        <InputLabel>Status</InputLabel>
        {
          <Select sx={{ textAlign: 'left' }} value={status} label={'Status'} onChange={onChangeHandler}>
            {Object.keys(statusValues).map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {statusValues[option]}
                </MenuItem>
              )
            })}
          </Select>
        }
      </FormControl>
    </ThemeProvider>
  )
}
