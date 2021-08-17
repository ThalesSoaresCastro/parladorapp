
import api from "../api/api"


import AuthContext from '../contexts/auth/auth';


interface PostCreate{
    post:string;
    userEmail:string;
}

interface PostDelete{
    idpost:string;
}

interface UserInfo{
    userEmail:string;
}

export const ListAllPosts = async() =>{
    const url='/allposts'

    return await api.get(url).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const CreatePost = async(post:PostCreate) =>{
    const url='/createpost'

    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const UpdatePost = async(post: PostCreate, idpost:string) =>{
    const url = `/updatepost/${idpost}`

    console.log('post: ', post)
    
    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const DeletePost = async(post: PostDelete ) => {
    const url='/deletepost'

    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const GetPostToUser = async(user: any  ) => {
    console.log('UserInfo: ', user)

    const url='/getallpostuser'

    return await api.post(url, user).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}