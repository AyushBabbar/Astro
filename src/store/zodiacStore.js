import { createSlice } from '@reduxjs/toolkit'
import {ECacheKeys} from "../utils/cacheKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    activeZodiac: null,
}

const zodiacSlice = createSlice({
    name: 'zodiac',
    initialState,
    reducers: {
        setActiveZodiac: (state, action) => {
            state.activeZodiac = action.payload
        },
    },
})

export const { setActiveZodiac } = zodiacSlice.actions
export default zodiacSlice.reducer
