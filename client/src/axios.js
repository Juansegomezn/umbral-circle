import axios from "axios"

export const makeRequest = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? "https://umbral-circle-server.vercel.app"
        : "http://localhost:3000",
    withCredentials: true
})