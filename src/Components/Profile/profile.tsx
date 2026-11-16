import type { ProfileViewProps } from 'types/profile'

import { MyPostsContainerComponent } from '@components/Profile/MyPosts'
import { ProfileInfoComponent } from '@components/Profile/ProfileInfo'

const Profile = (props: ProfileViewProps) => {
  return (
    <div>
      <ProfileInfoComponent
        profile={props.profile}
        userId={props.userId}
        ownerId={props.ownerId}
        userStatus={props.userStatus}
        updateAboutMe={props.updateAboutMe}
        updateUserPhoto={props.updateUserPhoto}
        editModeAboutMe={props.editModeAboutMe}
      />
      <MyPostsContainerComponent />
    </div>
  )
}

export const ProfileComponent = Profile
