import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const rootStore = configureStore({
    reducer: {
        counter: counterReducer,
    },
})