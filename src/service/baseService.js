import axios from 'axios'

// You can configure axios instance here if needed
export const API = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // example
})