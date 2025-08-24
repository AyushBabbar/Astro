import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {ECacheKeys} from "../utils/cacheKeys";

async function getApiKey() {
    return await SecureStore.getItemAsync(ECacheKeys.API_KEY);
}


export const API = axios.create({
    baseURL: "https://api.api-ninjas.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptor
API.interceptors.request.use(
    async (config) => {
        const apiKey = await getApiKey();
        if (apiKey) {
            config.headers["X-Api-Key"] = apiKey;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
