import type { profileType } from '@redux/profilePage-reducer'
import type { IRootStore } from '@redux/reduxStore'
import type { ComponentType } from 'react'
import type { Location, NavigateFunction, Params } from 'react-router-dom'

import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ProfileComponent } from '@components/Profile'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import {
  getUserProfile,
  getUserProfileStatus,
  updateAboutMe,
  updateUserPhoto,
} from '@redux/profilePage-reducer'
import { compose } from 'redux'

import { maxLengthCreator } from '@utils/Validators/validators'

type RouterProps = {
  router: { location: Location; navigate: NavigateFunction; params: Readonly<Params<string>> }
}

export function withRouter<T extends object>(Component: ComponentType<T & RouterProps>) {
  function ComponentWithRouterProp(props: T) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }
  return ComponentWithRouterProp
}

// class ProfileContainer extends React.Component {
//   refreshProfile() {
//     const userId = this.props.router.params.userId || this.props.ownerUserId;
//     this.props.getUserProfile(userId)
//     this.props.getUserProfileStatus(userId)
//     this.props.getUserAboutMe(userId)
//   }
//   componentDidMount() {
//     this.refreshProfile()
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.router.params.userId != prevProps.router.params.userId) {
//       this.refreshProfile()
//     }

//   }

//   render() {
//     return <div>
//       <Profile {...this.props}
//         profile={this.props.profile}
//         userId={this.props.router.params.userId}
//         ownerId={this.props.ownerUserId}
//         userStatus={this.props.userStatus}
//         updateUserProfileStatus={this.props.updateUserProfileStatus}
//         updateAboutMe={this.props.updateAboutMe}
//         updateUserPhoto={this.props.updateUserPhoto}
//         editModeAboutMe={this.props.editModeAboutMe}
//       // key={this.props.key}
//       />
//     </div>
//   }
// }

type ProfileContainerProps = RouterProps & {
  profile: profileType | null
  userStatus: string | null
  ownerUserId: number | null
  editModeAboutMe: boolean
  getUserProfile: (userId: number | null) => unknown
  getUserProfileStatus: (userId: number) => unknown
  updateAboutMe: (profile: profileType) => Promise<void>
  updateUserPhoto: (photo: File) => unknown
  key?: number | null
}

const ProfileContainer = (props: ProfileContainerProps) => {
  // console.log('Внутри контейнера профайл')
  const refreshProfile = () => {
    const userId = props.router.params.userId
      ? Number(props.router.params.userId)
      : props.ownerUserId
    props.getUserProfile(userId)
    if (userId !== null) props.getUserProfileStatus(userId)
    // props.getUserAboutMe(userId)
  }
  // useEffect(() => {
  //   refreshProfile()
  // }, [props.router.params.userId]);
  useEffect(() => {
    refreshProfile()
  }, [props.router.params.userId, props.ownerUserId])
  return (
    <div>
      <ProfileComponent
        {...props}
        profile={props.profile}
        userId={props.router.params.userId}
        ownerId={props.ownerUserId}
        userStatus={props.userStatus}
        updateAboutMe={props.updateAboutMe}
        updateUserPhoto={props.updateUserPhoto}
        editModeAboutMe={props.editModeAboutMe}
        key={props.key}
      />
    </div>
  )
}

const matStateToProps = (state: ReturnType<IRootStore>) => ({
  profile: state.profilePage.profile,
  userStatus: state.profilePage.profileStatus,
  ownerUserId: state.auth.id,
  editModeAboutMe: state.profilePage.editModeAboutMe,
  key: state.profilePage.key,
  // aboutMe: state.profilePage.aboutMe,
  // lookingForAJobDescription: state.profilePage.lookingForAJobDescription
})
export const ProfileContainerComponent = compose(
  connect(matStateToProps, {
    getUserProfile,
    getUserProfileStatus,
    updateAboutMe,
    updateUserPhoto,
    maxLengthCreator,
  }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)
