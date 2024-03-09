import { authAPI } from "../Api/apiRequest";
const SET_USER_DATA = 'SET_USER_DATA';
const ERROR = 'ERROR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const CAPTCHA_URL = 'CAPTCHA_URL';

type initialStateType = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean,
    error: string | null,
    captchaUrl: string | null
}
type setUserDataActionDataType = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuth: boolean,
    error: string | null
}
type setUserDataType = {
    type: typeof SET_USER_DATA,
    data: setUserDataActionDataType
}
type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type errorType = {
    type: typeof ERROR,
    data: string
}
type captchaUtlType = {
    type: typeof CAPTCHA_URL
    data: string
}
let initialState: initialStateType = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    isFetching: false,
    error: null,
    captchaUrl: null
}
const authReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data }
        }
        case CAPTCHA_URL: {
            return { ...state, captchaUrl: action.data }
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
export const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean, error: string | null): setUserDataType => ({ type: SET_USER_DATA, data: { email, id, login, isAuth, error } })
export const getUserData = () => async (dispatch: any) => {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setUserData(email, id, login, true, null));
    }
    ;
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await authAPI.getCaptchaUrl();
    const captchaUrl = data.data.url;
    dispatch(captchaUtlAC(captchaUrl));
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getUserData())
        dispatch(captchaUtlAC(''))
    } else {
        if (data.resultCode === 10) { dispatch(getCaptchaUrl()) }
        let message: string = data.messages[0];
        dispatch(error(message))
    }
};

export const logout = () => async (dispatch: any) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false, null))
    };
};

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const error = (error: string): errorType => ({ type: ERROR, data: error })
export const captchaUtlAC = (data: string): captchaUtlType => ({ type: CAPTCHA_URL, data })

export default authReducer;

