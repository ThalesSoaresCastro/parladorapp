
import api from "../api/api"

interface IPostCreate{
    post:string;
    userEmail:string;
}

interface IPostDelete{
    idpost:string;
}

interface IUserInfo{
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

export const CreatePost = async(post:IPostCreate) =>{
    const url='/createpost'

    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const UpdatePost = async(post: IPostCreate, idpost:string) =>{
    const url = `/updatepost/${idpost}`

    console.log('post: ', post)
    
    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const DeletePost = async(post: IPostDelete ) => {
    const url='/deletepost'

    return await api.post(url, post).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}

export const GetPostToUser = async(user: IUserInfo  ) => {
    console.log('UserInfo: ', user)

    const url='/getallpostuser'

    return await api.post(url, user).then(
        resp => { return resp }
    ).catch(
        error => { return error }
    )
}