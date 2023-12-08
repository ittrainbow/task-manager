import { Button as MUIButton } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { darkTheme } from './themes'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/selectors'

interface IButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  label: string
  disabled?: boolean
  width?: number | undefined
  nonUser?: boolean
}

export const Button = ({ onClick, disabled, label, width, nonUser = false }: IButtonProps) => {
  const { _id } = useSelector(selectUser)
  return (
    <ThemeProvider theme={darkTheme}>
      <MUIButton
        variant="outlined"
        onClick={onClick}
        disabled={disabled || (!_id && !nonUser)}
        sx={{
          width: width || '100%',
          cursor: 'pointer',
          '&.Mui-disabled': {
            background: '#484c53',
            color: '#ddd'
          }
        }}
      >
        {label}
      </MUIButton>
    </ThemeProvider>
  )
}
