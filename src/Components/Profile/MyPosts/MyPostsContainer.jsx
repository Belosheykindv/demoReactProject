import React from 'react';
import { connect } from 'react-redux';
import { addPostTextActionCreator, addPostLikeActionCreator } from '../../../Redux/profilePage-reducer';
import MyPosts from './MyPosts';
import { withAuthRedirect } from '../../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from '../../../Hoc/withRouter';

const mapStateToProps = (state) => {
  return {
    profilePage: (state.profilePage),
    isAuth: state.auth.isAuth,
    ownerId: state.auth.id
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => { dispatch(addPostTextActionCreator(newPostText)) },
    addLike: (postID) => { dispatch(addPostLikeActionCreator(postID)) },
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(MyPosts);
