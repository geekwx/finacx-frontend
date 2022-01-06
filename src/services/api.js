import axios from "axios";

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
});

export default api;