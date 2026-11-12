import { connect } from 'react-redux'
import MyPosts from './MyPosts'
import { compose } from 'redux'

import { withAuthRedirect } from '../../../Hoc/withAuthRedirect'
import { withRouter } from '../../../Hoc/withRouter'
import {
  addPostLikeActionCreator,
  addPostTextActionCreator,
} from '../../../Redux/profilePage-reducer'

// import { addLike, addPost, deletePost } from '../../../Redux/profilePage-reducer';
const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
    isAuth: state.auth.isAuth,
    ownerId: state.auth.id,
  }
}

export default compose(connect(mapStateToProps, {}), withRouter, withAuthRedirect)(MyPosts)
