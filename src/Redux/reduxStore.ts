import appReducer from './appReducer'
import authReducer from './authReducer'
import chatReducer from './chatReducer'
import dialogsReducer from './dialogPage-reducer'
import hookFormReducer from './hookFormReducer'
import profileReducer from './profilePage-reducer'
import settingPageReducer from './settingPageReducer'
import todoReducer from './todoReducer'
import usersReducer from './users-reducer'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'

export type IRootStore = typeof store.getState
export type AppDispatch = typeof store.dispatch
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
  settings: settingPageReducer,
  todo: todoReducer,
  hookForm: hookFormReducer,
})
const store = createStore(reducers, composedEnhancer)

export default store
