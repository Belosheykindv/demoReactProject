import store from '@redux/reduxStore'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
