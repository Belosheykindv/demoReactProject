
import { authAPI } from "../Api/apiRequest";
const SET_USER_DATA = 'SET_USER_DATA';
const ERROR = 'ERROR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    isFetching: false,
    error: null
}
const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case ERROR: {
            return { ...state, error: action.data }
        }
        default: return state;
    }
}
export const setUserData = (email, id, login, isAuth, error) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth, error } })
export const getUserData = () => async (dispatch) => {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setUserData(email, id, login, true, null));
    }
    ;
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        let message = data.messages[0];
        dispatch(error(message))
    }
};

export const logout = () => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false, null))
    };
};

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const error = (error) => ({ type: ERROR, data: error })

export default authReducer;

