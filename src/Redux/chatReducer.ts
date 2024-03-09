import { Dispatch } from "react";
import { chatAPI } from "../Api/apiRequest";
import { v1 } from 'uuid'
import id from 'uuid';
const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
const STATUS_CHANGED = 'STATUS_CHANGED';
const UNMOUNT = 'UNMOUNT';
type initialStateType = {
    messages: Array<string>,
    status: 'pending' | 'ready'
}
type unmountActionCreatorType = {
    type: typeof UNMOUNT,
    // status: string[]
}
type messageReceivedActionCreatorType = {
    type: typeof MESSAGES_RECEIVED,
    messages: string
}
type statusChangedActionCreatorType = {
    type: typeof STATUS_CHANGED,
    status: string
}
type actionsType = {
    type: string,
    messages: object[],
    status: string
}
let initialState: initialStateType = {
    messages: [],
    status: 'pending'
}
const chatReducer = (state = initialState, action: actionsType) => {

    switch (action.type) {
        case MESSAGES_RECEIVED: {
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map((m: object) => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100),
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
                messages: []
            };
        }

        default: return state;
    }
};

const newMessagesHandlerCreator = (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
    let _newMessagesHandler = null
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages: string) => {
            dispatch(messageReceivedActionCreator(messages))
        }
    }
    return _newMessagesHandler
}

const newStatusHandlerCreator = (dispatch: Dispatch<statusChangedActionCreatorType>) => {
    let _newStatusHandler = null
    if (_newStatusHandler === null) {
        _newStatusHandler = (status: string) => {
            dispatch(statusChangedActionCreator(status))
        }
    }
    return _newStatusHandler

}

export const startMessagesListening = () => async (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
}
export const startStatusListening = () => async (dispatch: Dispatch<statusChangedActionCreatorType>) => {
    chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const stopMessagesListening = () => async (dispatch: Dispatch<messageReceivedActionCreatorType>) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.stop()
}
export const stopStatusListening = () => async (dispatch: Dispatch<statusChangedActionCreatorType>) => {
    chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
}
export const unmountChat = () => (dispatch: Dispatch<unmountActionCreatorType>) => {
    dispatch(unmountActionCreator())
}
export const sendMessage = (message: string) => async () => {
    chatAPI.sendMessage(message)
}
export const messageReceivedActionCreator = (messages: string): messageReceivedActionCreatorType => {
    return { type: MESSAGES_RECEIVED, messages }
}

export const statusChangedActionCreator = (status: string): statusChangedActionCreatorType => {
    return { type: STATUS_CHANGED, status }
}

export const unmountActionCreator = (): unmountActionCreatorType => {
    return { type: UNMOUNT }
}
export default chatReducer;