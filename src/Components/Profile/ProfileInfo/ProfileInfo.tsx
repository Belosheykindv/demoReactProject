import type { ChangeEvent } from 'react'
import type { ProfileViewProps } from 'types/profile'

import React, { useState } from 'react'
import { PreloaderComponent } from '@components/Common'

import { ProfileAboutMe } from '@components/Profile/ProfileInfo/ProfileAboutMe'
import Anonym from '@src/Images/userPhoto.png'

import './ProfileInfo.scss'

// import { Field, Form } from 'react-final-form';

const ProfileInfo = React.memo((props: ProfileViewProps) => {
  const [isError, setError] = useState(false)
  if (!props.profile) {
    return <PreloaderComponent />
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size >= 4000000) return setError(true)
    if (e.target.files?.length) {
      props.updateUserPhoto(file)
      setError(false)
    }
  }

  return (
    <div className='profileInfo'>
      <div className='photoBlock'>
        {!props.userId && <label htmlFor='upload-photo'>Загрузить новое фото</label>}
        <img src={props.profile.photos.large || Anonym}></img>
        {isError && (
          <div style={{ border: '2px', color: 'red' }}> Файл не должен превышать 4МБ </div>
        )}
        {!props.userId && (
          <input className='hideUnput' id='upload-photo' onChange={onChange} type={'file'} />
        )}
      </div>
      <div className='infoBlock'>
        <div>
          {
            <ProfileAboutMe
              profile={props.profile}
              userId={props.userId}
              ownerId={props.ownerId}
              updateAboutMe={props.updateAboutMe}
              editModeAboutMe={props.editModeAboutMe}
              status={props.userStatus}
            />
          }
        </div>
      </div>
    </div>
  )
})

export const ProfileInfoComponent = ProfileInfo
