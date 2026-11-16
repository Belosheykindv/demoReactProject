import type { IRootStore } from '@redux/reduxStore'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import { withRouter } from '@hoc/withRouter'
import { compose } from 'redux'

import { MyPostsComponent } from '@components/Profile/MyPosts'

// import { addLike, addPost, deletePost } from '../../../Redux/profilePage-reducer';
const mapStateToProps = (state: ReturnType<IRootStore>) => {
  return {
    profilePage: state.profilePage,
    isAuth: state.auth.isAuth,
    ownerId: state.auth.id,
  }
}

export const MyPostsContainerComponent = compose(
  connect(mapStateToProps, {}),
  withRouter,
  withAuthRedirect,
)(MyPostsComponent) as ComponentType
