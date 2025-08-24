import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchTodayHoroscope} from "../service/horoscopeService";
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from "dayjs";
import isToday from 'dayjs/plugin/isToday';
import {ECacheKeys} from "../utils/cacheKeys";


export const fetchHoroscope = createAsyncThunk(
    'horoscope/fetchHoroscope',
    async (zodiacSign , {rejectWithValue}) => {
        try {
            const cached = await AsyncStorage.getItem(ECacheKeys.TODAY_HOROSCOPE)
            if (cached) {
                const parsedHoroscope = JSON.parse(cached)
                const cachedDate = parsedHoroscope.date
                dayjs.extend(isToday);
                if (dayjs(cachedDate).isToday()) {
                    console.log("returning from cache")
                    console.log("parsedHoroscope", parsedHoroscope)
                    return parsedHoroscope.horoscope
                }
            }
            const data = await fetchTodayHoroscope(zodiacSign)
            const dataToCache = {date: dayjs(), horoscope: data}
            console.log("Storing in cache")
            AsyncStorage.setItem(ECacheKeys.TODAY_HOROSCOPE, JSON.stringify(dataToCache))
            return data
        } catch (error) {
            console.log("ERROR ==>", error)
            return rejectWithValue(error.response?.data || 'Something went wrong')
        }
    }
)


const horoscopeSlice = createSlice({
    name: 'horoscope',
    initialState: {
        horoscope: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHoroscope.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchHoroscope.fulfilled, (state, action) => {
                state.loading = false
                state.horoscope = action.payload
            })
            .addCase(fetchHoroscope.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const {} = horoscopeSlice.actions
export default horoscopeSlice.reducer
