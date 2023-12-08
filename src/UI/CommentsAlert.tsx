import { ErrorOutlineOutlined } from '@mui/icons-material'
import { ThemeProvider } from '@mui/system'

import { darkTheme } from './themes'
import { useSelector } from 'react-redux'
import { selectContext } from '../redux/selectors'

export const CommentsAlert = () => {
  const { unsavedTaskIDs } = useSelector(selectContext)

  return unsavedTaskIDs.length > 0 ? (
    <ThemeProvider theme={darkTheme}>
      <div className="message-alert-icon">
        <ErrorOutlineOutlined />
      </div>
      <div className="header__greeting">Unsaved messages</div>
    </ThemeProvider>
  ) : null
}
