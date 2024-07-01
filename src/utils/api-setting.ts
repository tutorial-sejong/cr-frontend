import axios from "axios"

console.log(import.meta.env.VITE_BASE_URL)
export const requestApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})