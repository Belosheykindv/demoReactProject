import appReducer from '@redux/appReducer'
import authReducer from '@redux/authReducer'
import chatReducer from '@redux/chatReducer'
import dialogsReducer from '@redux/dialogPage-reducer'
import hookFormReducer from '@redux/hookFormReducer'
import profileReducer from '@redux/profilePage-reducer'
import settingPageReducer from '@redux/settingPageReducer'
import todoReducer from '@redux/todoReducer'
import usersReducer from '@redux/users-reducer'
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
