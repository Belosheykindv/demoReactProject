import React from 'react';
import { connect } from 'react-redux';
import { addPostTextActionCreator, addPostLikeActionCreator } from '../../../Redux/profilePage-reducer';
import MyPosts from './MyPosts';
import { withAuthRedirect } from '../../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../../Hoc/withRouter';
// import { addLike, addPost, deletePost } from '../../../Redux/profilePage-reducer';
const mapStateToProps = (state) => {
  return {
    profilePage: (state.profilePage),
    isAuth: state.auth.isAuth,
    ownerId: state.auth.id
  }
}

export default compose(
  connect(mapStateToProps, { }),
  withRouter,
  withAuthRedirect
)(MyPosts);
