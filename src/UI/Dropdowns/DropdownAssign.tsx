import { useDispatch, useSelector } from 'react-redux'

import { Select, SelectChangeEvent, InputLabel, MenuItem, FormControl, IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Clear } from '@mui/icons-material'

import { selectApp, selectContext } from '../../redux/selectors'
import { SET_ASSIGNED } from '../../redux/types'
import { darkTheme } from '../themes'

export const DropdownAssign = () => {
  const { userlist } = useSelector(selectApp)
  const { assigned } = useSelector(selectContext)
  const dispatch = useDispatch()

  const onChangeHandler = (e: SelectChangeEvent) =>
    dispatch({ type: SET_ASSIGNED, payload: { assigned: e.target.value } })

  const onClearHandler = () => dispatch({ type: SET_ASSIGNED, payload: { assigned: null } })

  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl
        sx={{
          margin: '8px 0',
          width: '100%'
        }}
      >
        <InputLabel>Assign</InputLabel>
        {
          <Select
            sx={{ textAlign: 'left' }}
            value={assigned || ''}
            label={'Assign'}
            onChange={onChangeHandler}
            endAdornment={
              assigned && (
                <IconButton onClick={onClearHandler} sx={{ color: '#ddd', fontSize: '15px', right: '10px' }}>
                  <Clear />
                </IconButton>
              )
            }
          >
            {userlist.map((user) => {
              const { name, _id } = user
              return (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              )
            })}
          </Select>
        }
      </FormControl>
    </ThemeProvider>
  )
}
