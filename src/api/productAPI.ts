import axios from "axios";

export const productAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})