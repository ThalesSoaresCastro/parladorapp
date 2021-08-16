import api from '../api/api'

interface tokenUser{
    token:string
}

interface UserCreate{
	name:string,
	email:string,
	password:string
}

export const userByToken = async(usertoken:tokenUser) => {
    const url = '/getbytoken'
    
    return await api.post(url,usertoken//, {
       // headers: {'Authorization': 'Bearer '+usertoken.token }
    //}
    ).then(
        resp => { return resp }
    ).catch(
        error => {return error }
    )
}

export const userCreate = async(user:UserCreate) =>{
    const url = '/users'

    return api.post(url, user).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )


}