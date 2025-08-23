import {API} from "./baseService";

export const fetchUsersApi = async () => {
    const response = await API.get('/users')
    return response.data
}
