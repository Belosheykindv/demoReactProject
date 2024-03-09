import React, { useEffect, useState } from 'react';
import P from './ProfileInfo.module.css';
import Anonym from '../../../Images/userPhoto.png'
import Preloader from '../../Common/Preloader/preloader';
import ProfileStatus from '../ProfileStatus';
import { ProfileAboutMe } from './ProfileAboutMe';
// import { Field, Form } from 'react-final-form';
import styles from "../../Common/FormControls/formControls.module.css"
import { Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileInfo = React.memo((props) => {
  console.log('ПЕРЕРИСОВКА')
  const [isError, setError] = useState(false)
  const [isVisible, setIsvidible] = useState(false)
  if (!props.profile) {
    return <Preloader />
  }
  const onChange = (e) => {
    if (e.target.files[0].size >= 4000000) return setError(true); setIsvidible(true)
    if (e.target.files.length) {
      props.updateUserPhoto(e.target.files[0])
      setError(false)
      setIsvidible(false)
    }
  }

  return <div>

    <div className={P.profile}>
      <div className={P.photoBlock}>
        {!props.userId && <label htmlFor="upload-photo">Загрузить новое фото</label>}
        <img
          // onMouseOver={() => setTimeout(() => { setIsvidible(true) }, 500)}

          src={props.profile.photos.large || Anonym}></img>
        {isError && <div style={{ 'border': '2px', 'color': 'red' }}> Файл не должен превышать 4МБ </div>}
        {!props.userId && <input className={P.hideUnput} id="upload-photo" onChange={onChange} type={'file'} />
        }
      </div>
      <div className={P.infoBlock}>
        <div>
          {/* <b>ID -</b> {props.profile.userId} */}
          {/* <ProfileStatus
            key={props.key}
            userId={props.userId}
            ownerId={props.ownerId}
            status={props.userStatus}
            updateUserProfileStatus={props.updateUserProfileStatus} /> */}
        </div>
        <div>{<ProfileAboutMe
          key={props.key}
          profile={props.profile}
          userId={props.userId}
          ownerId={props.ownerId}
          updateAboutMe={props.updateAboutMe}
          editModeAboutMe={props.editModeAboutMe}
          status={props.userStatus}
          updateUserProfileStatus={props.updateUserProfileStatus} />}</div>
      </div>
    </div>
  </div>
}
)

export default ProfileInfo;