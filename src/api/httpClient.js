import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.api,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;