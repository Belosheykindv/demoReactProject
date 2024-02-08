import { getUserData } from "./authReducer";
const INITIALIZE_SUCCES = 'INITIALIZE_SUCCES';

type initialStateType = {
    initialize: boolean
}
type initializeSuccesType = {
    type: typeof INITIALIZE_SUCCES
}
let initialState: initialStateType = {
    initialize: false
}
const initializeSucces = (): initializeSuccesType => ({ type: INITIALIZE_SUCCES })

const appReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case INITIALIZE_SUCCES: {
            return { ...state, initialize: true }
        }
        default: return state;
    }
}

export const initializedApp = () => (dispatch: any) => {
    let initializeApp = dispatch(getUserData());
    Promise.all([initializeApp]).then(() => { dispatch(initializeSucces()) })
}


export default appReducer;

