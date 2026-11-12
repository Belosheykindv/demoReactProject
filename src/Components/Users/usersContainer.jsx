import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Users from './Users'
import { compose } from 'redux'

import { withAuthRedirect } from '../../Hoc/withAuthRedirect'
import {
  follow,
  getPageUsers,
  getTotalUsersCount,
  getUsers,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  togglefollowingProgress,
  toggleIsFetching,
  unfollow,
} from '../../Redux/users-reducer'
import Preloader from '../Common/Preloader/preloader'

const UsersApiContainer = (props) => {
  useEffect(() => {
    props.toggleIsFetching(true)
    props.getUsers(props.pageSize)
    props.setCurrentPage(1)
  }, [])
  const onPageChanged = (pageNumber) => {
    props.toggleIsFetching(true)
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let truePage = pagesCount - pageNumber + 1
    console.log(truePage)
    props.setCurrentPage(pageNumber)
    props.getPageUsers(props.pageSize, truePage)
  }
  if (props.auth === false) return <Navigate to={'/login'} />
  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      <Users
        onPageChanged={onPageChanged}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
        currentPage={props.currentPage}
        follow={props.follow}
        unfollow={props.unfollow}
        users={props.users}
        followingInProgress={props.followingInProgress}
        togglefollowingProgress={props.togglefollowingProgress}
      />
    </>
  )
}
// class UsersApiContainer extends React.Component {
//     componentDidMount() {
//         this.props.toggleIsFetching(true);
//         this.props.getUsers(this.props.pageSize)
//         this.props.setCurrentPage(1);
//     }
//     onPageChanged = (pageNumber) => {
//         this.props.toggleIsFetching(true);
//         let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
//         let truePage = pagesCount - pageNumber + 1;
//         console.log(truePage);
//         this.props.setCurrentPage(pageNumber);
//         this.props.getPageUsers(this.props.pageSize, truePage)
//     }

//     render() {
//         if (this.props.auth === false) return <Navigate to={'/login'} />
//         return <>
//             {this.props.isFetching ? <Preloader /> : null}
//             <Users
//                 onPageChanged={this.onPageChanged}
//                 pageSize={this.props.pageSize}
//                 totalUsersCount={this.props.totalUsersCount}
//                 currentPage={this.props.currentPage}
//                 follow={this.props.follow}
//                 unfollow={this.props.unfollow}
//                 users={this.props.users}
//                 followingInProgress={this.props.followingInProgress}
//                 togglefollowingProgress={this.props.togglefollowingProgress}
//             />
//         </>
//     }
// }
let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default compose(
  connect(mapStateToProps, {
    getUsers,
    getPageUsers,
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    togglefollowingProgress,
  }),
  withAuthRedirect,
)(UsersApiContainer)
