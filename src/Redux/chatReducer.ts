import { chatAPI } from "../Api/apiRequest";
import { v1 } from 'uuid'
const id = require('uuid');
const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
const STATUS_CHANGED = 'STATUS_CHANGED';
const UNMOUNT = 'UNMOUNT';
type initialStateType = {
    messages: Array<string>,
    status: 'pending' | 'ready'
}
let initialState = {
    messages: [],
    status: 'pending'
}
const chatReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case MESSAGES_RECEIVED: {
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100),
            };
        }
        case STATUS_CHANGED: {
            return {
                ...state,
                status: action.status,
            };
        }
        case UNMOUNT: {
            return {
                ...state,
                messages: [...action.status],
            };
        }

        default: return state;
    }
};
let _newMessagesHandler = null
const newMessagesHandlerCreator = (dispatch: any) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(messageReceivedActionCreator(messages))
        }
    }
    return _newMessagesHandler
}
let _newStatusHandler = null
const newStatusHandlerCreator = (dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(statusChangedActionCreator(status))
        }
    }
    return _newStatusHandler

}
export const startMessagesListening = () => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
    chatAPI.stop()
}
export const unmountChat = () => (dispatch) => {
    let emptyArray = []
    dispatch(unmountActionCreator(emptyArray))

}
export const sendMessage = (message) => async (dispatch) => {
    chatAPI.sendMessage(message)
}
export const messageReceivedActionCreator = (messages) => {
    return { type: MESSAGES_RECEIVED, messages }
}

export const statusChangedActionCreator = (status) => {
    return { type: STATUS_CHANGED, status }
}
export const unmountActionCreator = (status) => {
    return { type: UNMOUNT, status }
}
export default chatReducer;