import { configureStore } from '@reduxjs/toolkit'
import horoscopeReducer from '../store/horoscopeStore'
import zodiacReducer from '../store/zodiacStore'


export const rootStore = configureStore({
    reducer: {
        horoscope: horoscopeReducer,
        zodiac: zodiacReducer,
    },
})