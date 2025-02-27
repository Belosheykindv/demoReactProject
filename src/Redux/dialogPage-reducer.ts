import { v1 } from 'uuid'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type dialogsType = {
    id: string
    name: string
    imgSrc: string
}
export type messagesType = {
    id: string
    message: string

}
export interface IinitialState {
    dialogs: dialogsType[]
    messages: messagesType[]
}
let initialState: IinitialState = {
    dialogs: [
        { id: '1', name: 'Alina', imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: '2', name: 'Denis', imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: '3', name: 'Egor', imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: '4', name: 'Oleg', imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: '5', name: 'Kristina', imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }],
    messages: [
        { id: '1', message: 'Hi' },
        { id: '2', message: 'Hello' },
        { id: '3', message: 'Hola' },],
}
const dialogsSlice = createSlice({
    name: 'dialogsSlice',
    initialState,
    reducers: {
        addDialogMessage: (state, action: PayloadAction<string>) => {
            console.log('Внтури диспатчка диалогов')
            let newMessage = {
                id: v1(),
                message: action.payload,
            };
            return {
                ...state, messages: [...state.messages, newMessage],
            }
        }
    }
})

export const { addDialogMessage } = dialogsSlice.actions
export default dialogsSlice.reducer