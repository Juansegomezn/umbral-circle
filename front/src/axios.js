import axios from "axios"

export const makeRequest = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? "/api" 
        : "http://localhost:3000/api",
    withCredentials: true
})