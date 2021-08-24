import axios from 'axios'
import { parseCookies } from 'nookies';

const { 'nextpaladorapp.token':token } = parseCookies()

const api = axios.create({
    //baseURL:'http://localhost:4004',
    baseURL:'http://parlador-api:4004',

});

export default api;

if(token){
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}