import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_USER } from '../../redux/types'
import { selectLoading, selectUser } from '../../redux/selectors'
import { Button, Input, Loader } from '../../UI'
import { InputTarget } from '../../interfaces'

export const Profile = () => {
  const { name, _id } = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tempName, setTempName] = useState<string>('')

  useEffect(() => {
    name && setTempName(name)
  }, [name])

  const submitHandler = async () => {
    dispatch({ type: UPDATE_USER, payload: { name: tempName, _id } })
  }

  const onChangeHandler = (e: InputTarget) => {
    const { value } = e.target
    setTempName(value)
  }

  const noChanges = name === tempName

  return (
    <div className="auth-container flexcol">
      <div className="auth-container__inner">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Input onChange={onChangeHandler} type="text" value={tempName} label="Change name" />
            <div className="mt40 flexcol10">
              <Button onClick={submitHandler} disabled={noChanges} label="Submit" />
              <Button onClick={() => navigate(-1)} label={noChanges ? 'Back' : 'Cancel'} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
