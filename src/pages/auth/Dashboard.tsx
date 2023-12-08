import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectLoading, selectUser } from '../../redux/selectors'
import { Button } from '../../UI'

export const Dashboard = () => {
  const loading = useSelector(selectLoading)
  const { name, email, _id } = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !_id) navigate('/login')
    // eslint-disable-next-line
  }, [loading, _id])

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        <div>{name}</div>
        <div>{email}</div>
        <div className="auth-container flexcol">
          <Button onClick={() => navigate('/profile')} label="Edit Profile" />
        </div>
      </div>
    </div>
  )
}
