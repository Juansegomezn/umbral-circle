import axios from "axios"

export const makeRequest = axios.create({
    baseURL: import.meta.env.MODE === "production" 
        ? "https://umbral-circle-server.vercel.app"
        : "http://localhost:3000",
    withCredentials: true
})
makeRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);