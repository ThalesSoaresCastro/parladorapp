import api from '../api/api'

interface ITokenUser{
    token:string
}

interface IUserCreate{
	name:string,
	email:string,
	password:string
}

interface IDeleteUser{
    email:string;
}

export const userByToken = async(usertoken:ITokenUser) => {
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

export const userCreate = async(user:IUserCreate) =>{
    const url = '/users'

    return api.post(url, user).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )


}


export const deleteUser = async(user:IDeleteUser) =>{

    const url = '/deleteuser'

    return api.post(url, user).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )

}


export const getUser = async(user:IDeleteUser) =>{
    const url = '/getuser'
    return api.post(url, user).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )
}

export const updateUser = async(user:IUserCreate, id:string) =>{
    const url = `/updateuser/${id}`
    return api.post(url, user).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )
}


export const getAllUser = async() =>{
    const url = '/users'
    return api.get(url).then(
        resp => { return resp }
    ).catch(
        resp => { return resp }
    )
}
