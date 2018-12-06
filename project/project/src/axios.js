import axios from 'axios';

const instance = axios.create({
    baseURL: 'mongodb://127.0.0.1/project'
    
});