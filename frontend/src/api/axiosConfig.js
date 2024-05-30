import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default axios.create({
    baseURL: baseURL,
    headers: {"ngrok-skip-browser-warning": "true"},
});