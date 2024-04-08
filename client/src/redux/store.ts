import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './appSlice'
import { mainApi } from './main.api'

const store = configureStore({
  reducer: {
    app: appReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(mainApi.middleware),
})
setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
