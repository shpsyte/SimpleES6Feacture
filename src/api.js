import  axios from "axios";

const api = axios.create({
    baserURL: 'https://api.github.com',
});

export default api;