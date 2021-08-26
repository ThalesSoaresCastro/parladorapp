import axios from 'axios'
//import { parseCookies } from 'nookies';

//const { 'nextpaladorapp.token':token } = parseCookies()

const api = axios.create({
    baseURL:'http://localhost:4004',

});

export default api;
//if(token){
//    api.defaults.headers['Authorization'] = `Bearer ${token}`;
//}