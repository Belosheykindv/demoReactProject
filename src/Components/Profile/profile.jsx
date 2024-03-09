import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {

  return <div>
    <ProfileInfo
      profile={props.profile}
      userId={props.userId}
      ownerId={props.ownerId}
      userStatus={props.userStatus}
      updateUserProfileStatus={props.updateUserProfileStatus}
      updateAboutMe={props.updateAboutMe}
      savePhoto={props.savePhoto}
      updateUserPhoto={props.updateUserPhoto}
      editModeAboutMe={props.editModeAboutMe}
      key={props.key}
    />
    <MyPostsContainer />

  </div>

}

export default Profile;