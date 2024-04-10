import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { getUserProfile, getUserProfileStatus, getUserAboutMe, updateUserProfileStatus, updateAboutMe, updateUserPhoto } from '../../Redux/profilePage-reducer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { maxLengthCreator } from '../../Utils/Validators/validators';

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
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

const ProfileContainer = (props) => {
  console.log('Внутри контейнера профайл')
  const refreshProfile = () => {
    const userId = props.router.params.userId || props.ownerUserId;
    props.getUserProfile(userId)
    props.getUserProfileStatus(userId)
    // props.getUserAboutMe(userId)
  }
  // useEffect(() => {
  //   refreshProfile()
  // }, [props.router.params.userId]);
  useEffect(() => { refreshProfile() }, [props.router.params.userId])
  return <div>
    <Profile {...props}
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
}

let matStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userStatus: state.profilePage.profileStatus,
  ownerUserId: state.auth.id,
  editModeAboutMe: state.profilePage.editModeAboutMe,
  key: state.profilePage.key
  // aboutMe: state.profilePage.aboutMe,
  // lookingForAJobDescription: state.profilePage.lookingForAJobDescription
})
export default compose(
  connect(matStateToProps, { getUserProfile, getUserProfileStatus, updateAboutMe,
     updateUserPhoto, maxLengthCreator }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
