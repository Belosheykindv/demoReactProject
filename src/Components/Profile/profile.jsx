import { MyPostsContainerComponent } from './MyPosts/MyPostsContainer'
import { ProfileInfoComponent } from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <ProfileInfoComponent
        profile={props.profile}
        userId={props.userId}
        ownerId={props.ownerId}
        userStatus={props.userStatus}
        updateAboutMe={props.updateAboutMe}
        savePhoto={props.savePhoto}
        updateUserPhoto={props.updateUserPhoto}
        editModeAboutMe={props.editModeAboutMe}
        key={props.key}
      />
      <MyPostsContainerComponent />
    </div>
  )
}

export const ProfileComponent = Profile
