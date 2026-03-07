import axios from "axios"

export const makeRequest = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? "https://umbral-circle-b8hv3dcg6-juansegartors-projects.vercel.app/api" 
        : "http://localhost:3000",
    withCredentials: true
})