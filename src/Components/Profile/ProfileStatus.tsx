import type { ChangeEvent } from 'react'
import type { AppDispatch, RootState } from 'types/store'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateUserProfileStatus } from '@redux/profilePage-reducer'

const ProfileFuncStatus = () => {
  const userStatus = useSelector((state: RootState) => state.profilePage.profileStatus)
  const { userId } = useParams<{ userId?: string }>()
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(userStatus ?? '')
  const dispatch = useDispatch<AppDispatch>()

  const activateEditMode = () => {
    if (!userId) {
      setEditMode(true)
    }
  }

  const deActivateEditMode = () => {
    setEditMode(false)
    dispatch(updateUserProfileStatus(status))
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>
            <b>Статус - </b>
            {userStatus || 'пусто'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input onChange={onStatusChange} autoFocus={true} defaultValue={userStatus ?? ''}></input>
          <button onClick={deActivateEditMode}>Сохранить</button>
        </div>
      )}
    </div>
  )
}

export const ProfileStatusComponent = ProfileFuncStatus
