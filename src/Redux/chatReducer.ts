/* eslint-disable prefer-const */
import { Dispatch } from 'react'
import { v1 } from 'uuid'

import { chatAPI } from '@src/Api/apiRequest'

const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
const STATUS_CHANGED = 'STATUS_CHANGED'
const UNMOUNT = 'UNMOUNT'
type initialStateType = {
  messages: Array<{
    id: string
    userId: number
    userName: string
    photo: string | null
    message: string
  }>
  status: 'pending' | 'ready' | 'error'
}
type unmountActionCreatorType = {
  type: typeof UNMOUNT
  // status: string[]
}
type messageReceivedActionCreatorType = {
  type: typeof MESSAGES_RECEIVED
  messages: Array<{ userId: number; userName: string; photo: string | null; message: string }>
}
type statusChangedActionCreatorType = {
  type: typeof STATUS_CHANGED
  status: 'pending' | 'ready' | 'error'
}
type actionsType = {
  type: string
  messages: Array<{ userId: number; userName: string; photo: string | null; message: string }>
  status: 'pending' | 'ready' | 'error'
}
let initialState: initialStateType = {
  messages: [],
  status: 'pending',
}
const chatReducer = (
  state: initialStateType = initialState,
  action: actionsType,
): initialStateType => {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      return {
        ...state,
        messages: [...state.messages, ...action.messages.map((m) => ({ ...m, id: v1() }))].filter(
          (_m, index, array) => index >= array.length - 100,
        ),
      }
    }
    case STATUS_CHANGED: {
      return {
        ...state,
        status: action.status,
      }
    }
    case UNMOUNT: {
      return {
        ...state,
        messages: [],
      }
    }

    default:
      return state
  }
}

const newMessagesHandlerCreator = (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
  let _newMessagesHandler:
    ((messages: messageReceivedActionCreatorType['messages']) => void) | null = null
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages: messageReceivedActionCreatorType['messages']) => {
      dispatch(messageReceivedActionCreator(messages))
    }
  }
  return _newMessagesHandler
}

const newStatusHandlerCreator = (dispatch: Dispatch<statusChangedActionCreatorType>) => {
  let _newStatusHandler: ((status: statusChangedActionCreatorType['status']) => void) | null = null
  if (_newStatusHandler === null) {
    _newStatusHandler = (status: statusChangedActionCreatorType['status']) => {
      dispatch(statusChangedActionCreator(status))
    }
  }
  return _newStatusHandler
}

export const startMessagesListening =
  () => async (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch)!)
  }
export const startStatusListening =
  () => async (dispatch: Dispatch<statusChangedActionCreatorType>) => {
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch)!)
  }
export const stopMessagesListening =
  () => async (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch)!)
    chatAPI.stop()
  }
export const stopStatusListening =
  () => async (dispatch: Dispatch<statusChangedActionCreatorType>) => {
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch)!)
  }
export const unmountChat = () => (dispatch: Dispatch<unmountActionCreatorType>) => {
  dispatch(unmountActionCreator())
}
export const sendMessage = (message: string) => async () => {
  chatAPI.sendMessage(message)
}
export const messageReceivedActionCreator = (
  messages: messageReceivedActionCreatorType['messages'],
): messageReceivedActionCreatorType => {
  return { type: MESSAGES_RECEIVED, messages }
}

export const statusChangedActionCreator = (
  status: statusChangedActionCreatorType['status'],
): statusChangedActionCreatorType => {
  return { type: STATUS_CHANGED, status }
}

export const unmountActionCreator = (): unmountActionCreatorType => {
  return { type: UNMOUNT }
}
export default chatReducer
