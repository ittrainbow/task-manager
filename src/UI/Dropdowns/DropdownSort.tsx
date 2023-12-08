import { useDispatch, useSelector } from 'react-redux'

import { Select, SelectChangeEvent, InputLabel, MenuItem, FormControl } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { selectTask } from '../../redux/selectors'
import { SET_TASK_SORT } from '../../redux/types'
import { sortValues } from '../../helpers'
import { darkTheme } from '../themes'

export const DropdownSort = () => {
  const { taskSort } = useSelector(selectTask)
  const dispatch = useDispatch()

  const onChangeHandler = (e: SelectChangeEvent) =>
    dispatch({ type: SET_TASK_SORT, payload: { taskSort: e.target.value } })

  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        sx={{
          margin: '8px 0',
          width: '100%'
        }}
      >
        <InputLabel>Sort</InputLabel>
        {
          <Select sx={{ textAlign: 'left' }} value={taskSort} label={'Sort'} onChange={onChangeHandler}>
            {Object.keys(sortValues).map((option, index) => {
              const value = sortValues[option]
              return (
                <MenuItem key={index} value={option}>
                  {value}
                </MenuItem>
              )
            })}
          </Select>
        }
      </FormControl>
    </ThemeProvider>
  )
}
