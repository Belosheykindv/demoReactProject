import { stopSubmit } from "redux-form";
import { authAPI } from "../Api/apiRequest";
const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

type setUserDataType = typeof SET_USER_DATA;
type toggleisFethingType = typeof TOGGLE_IS_FETCHING
// type setUserDataActionType = {
//     type: typeof SET_USER_DATA,
//     data: {
//         email: string,
//         id: number,
//         login: string,
//         isAuth: boolean
//     }
// }
type actionType = setUserDataType | toggleisFethingType;
type initialStateAutType = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean
};

let initialState: initialStateAutType = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    isFetching: false
}
const authReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default: return state;
    }
}
export const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, data: { email, id, login, isAuth } })
export const getUserData = () => async (dispatch: any) => {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setUserData(email, id, login, true));
    }
    ;
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        let message = data.messages[0];
        dispatch(dispatch(stopSubmit('login', { _error: message })));
    }
};

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    };
};

export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export default authReducer;

