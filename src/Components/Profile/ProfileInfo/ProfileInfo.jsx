import React from 'react';
import P from './ProfileInfo.module.css';
import Anonym from '../../../Images/userPhoto.png'
import Preloader from '../../Common/Preloader/preloader';
import ProfileStatus from '../ProfileStatus';
import { ProfileAboutMe } from './ProfileAboutMe';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.updateUserPhoto(e.target.files[0])
    }
  }
  return <div>
    <div className={P.profile}>
      <img src={props.profile.photos.large || Anonym}></img>
      {!props.userId && <div><input type={"file"} onChange={onMainPhotoSelected} /></div>}
      <div><b>ID -</b> {props.profile.userId}</div>
      <div>
        <ProfileStatus
          key={props.key}
          userId={props.userId}
          ownerId={props.ownerId}
          status={props.userStatus}
          updateUserProfileStatus={props.updateUserProfileStatus} />
        <div>
          {<ProfileAboutMe
            key={props.key}
            profile={props.profile}
            userId={props.userId}
            ownerId={props.ownerId}
            updateAboutMe={props.updateAboutMe}
            editModeAboutMe={props.editModeAboutMe}
          />}
        </div>
      </div>
    </div>
  </div>
}

export default ProfileInfo;