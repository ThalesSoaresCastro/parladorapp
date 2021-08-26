
import api from '../api/api'

interface UserLogin{
    email:string,
    password:string
}

const authService = async(user:UserLogin) =>{
    const url = '/auth'
    
    return await api.post(url, user).then(
        resp => { 
            return resp
        }
    ).catch(
        
        error => { 
            return error}
    )


}

export default authService;