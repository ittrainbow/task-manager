import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../UI'
import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Loader } from '../../UI'
import { auth } from '../../db/firebase'
import { selectLoading, selectUser } from '../../redux/selectors'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const loading = useSelector(selectLoading)
  const { name, email } = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/') // eslint-disable-next-line
  }, [])

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>{name}</div>
            <div>{email}</div>
            <div className="auth-container flexcol">
              <Button onClick={() => navigate('/profile')} label="Edit Profile" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
