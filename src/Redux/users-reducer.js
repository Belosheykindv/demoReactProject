import { userAPI } from "../Api/apiRequest";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(
                    u => {
                        if (u.id === action.userID) {
                            return { ...u, followed: true }
                        }
                        return u;
                    }
                )
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(
                    u => {
                        if (u.id === action.userID) {
                            return { ...u, followed: false }
                        }
                        return u;
                    }
                )
            }
        }
        case SET_USERS: {
            return { ...state, users: [...action.users].reverse() }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.usersCount }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFollowed
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        }
        default: return state;
    }
}
export const follow = (userID) => ({ type: FOLLOW, userID })
export const unfollow = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (usersCount) => ({ type: SET_TOTAL_USERS_COUNT, usersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const togglefollowingProgress = (isFollowed, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowed, userID })

export const getUsers = (pageSize) => (dispatch) => {
    userAPI.getTotalusersCount()
        .then(data => {
            dispatch(setTotalUsersCount(data));
            let pagesCount = Math.ceil(data / pageSize);
            userAPI.getUsers(pageSize, pagesCount)
                .then(data => {
                    dispatch(setUsers(data));
                    dispatch(toggleIsFetching(false));
                });
        });
};

export const getPageUsers = (pageSize, truePage) => (dispatch) => {
    userAPI.getUsers(pageSize, truePage)
        .then(data => {
            dispatch(setUsers(data));
            dispatch(toggleIsFetching(false));
        });
}


export default usersReducer;

