import axios from "axios";

export const api = axios.create({
    baseURL : 'https://resumeiq-api.onrender.com'
})