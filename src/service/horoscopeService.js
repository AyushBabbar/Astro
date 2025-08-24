import {API} from "./baseService";

export const fetchTodayHoroscope = async (zodiacSign) => {
    const response = await API.get(`/horoscope?zodiac=${zodiacSign.toLowerCase()}`)
    return response.data
}
