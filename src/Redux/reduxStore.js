import { combineReducers, legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import profileReducer from "./profilePage-reducer";
import dialogsReducer from "./dialogPage-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer.ts";
import chatReducer from "./chatReducer.ts";
import settingPageReducer from './settingPageReducer'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer.ts";
import todoReducer from "./todoReducer";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    settings: settingPageReducer,
    todo: todoReducer
});
let store = createStore(reducers, composedEnhancer);
window.store = store;
export default store;