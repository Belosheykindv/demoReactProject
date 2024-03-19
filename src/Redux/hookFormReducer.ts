import { PayloadAction, createSlice } from "@reduxjs/toolkit"

let initialState: Istate = {
    firstName: 'Kill',
    lastName: 'Real',
    adress: 'Moscow, Russia',
    age: 66,

}
export type Istate = {
    firstName: string
    lastName: string
    adress: string
    age: number

}
const hookFormSlice = createSlice({
    name: 'hookFormSlice',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload
        },
        setSubmitData: (state, action: PayloadAction<Istate>) => {
            return { ...state } = action.payload
        }
    }
})


export const { setFirstName, setSubmitData } = hookFormSlice.actions
export default hookFormSlice.reducer