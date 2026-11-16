import type { User } from 'types/components'

import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { PreloaderComponent } from '@components/Common'
import { UsersComponent } from '@components/Users'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import {
  follow,
  getPageUsers,
  getUsers,
  setCurrentPage,
  setUsers,
  togglefollowingProgress,
  toggleIsFetching,
  unfollow,
} from '@redux/users-reducer'
import { compose } from 'redux'

type UsersStateProps = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}

type UsersDispatchProps = {
  getUsers: (pageSize: number) => void
  getPageUsers: (pageSize: number, page: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: (users: User[]) => void
  setCurrentPage: (page: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  togglefollowingProgress: (isFollowing: boolean, userId: number) => void
}

type UsersProps = UsersStateProps & UsersDispatchProps & { auth: boolean }

const UsersApiContainer = (props: UsersProps): JSX.Element => {
  useEffect(() => {
    props.toggleIsFetching(true)
    props.getUsers(props.pageSize)
    props.setCurrentPage(1)
  }, [])
  const onPageChanged = (pageNumber: number) => {
    props.toggleIsFetching(true)
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const truePage = pagesCount - pageNumber + 1
    console.log(truePage)
    props.setCurrentPage(pageNumber)
    props.getPageUsers(props.pageSize, truePage)
  }
  if (props.auth === false) return <Navigate to={'/login'} />
  return (
    <>
      {props.isFetching ? <PreloaderComponent /> : null}
      <UsersComponent
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
const mapStateToProps = (state: { usersPage: UsersStateProps }) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export const UsersContainerComponent = compose(
  connect(mapStateToProps, {
    getUsers,
    getPageUsers,
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    toggleIsFetching,
    togglefollowingProgress,
  }),
  withAuthRedirect,
)(UsersApiContainer)
