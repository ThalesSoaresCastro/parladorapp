/* eslint-disable react-hooks/exhaustive-deps */
import React,{ createContext, useState, useEffect } from "react";

import authService from '../../services/authservice'
import {
    userByToken
} from '../../services/userservice'

//import {setCookie, parseCookies} from 'nookies'

//import Router from 'next/router'


interface IPost{
    id?:string;
    text_post?: string;
    created_at?: Date;
    edited_in?: Date | null
    changed?: boolean;
    user?:IUser;
}

interface IUser{
    id?:string;
    name?: string;
    email?: string;
    password?:string;
    created_at?: Date;
    edited_in?: Date | null;
    posts?: IPost[] | undefined;
}

interface ILogin{
    email: string;
    password: string;
}

interface AuthContextData{
    signed: boolean;
    //token: string;
    user:IUser | null;
    signIn: (login:ILogin) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user,setUser] = useState<object | null>(null);
    //const [token, setToken] = useState('');
    useEffect(()=>{
        async function fetchUser() {
            //const { 'nextpaladorapp.token':token } = parseCookies()
            //if(token){
            //    const resp = await userByToken({token:token})
            //    if(resp.status === 200){
                    //console.log('data: ', resp.data.data)
            //        setUser(resp.data.data)
            //    }
            //}
        }
        fetchUser()
    },[])

    async function signIn(login: ILogin) {
        const response = await authService(login);

        if(response.status === 200){            
            setUser(response.data.data.user)
            //setCookie(undefined, 
            //    'nextpaladorapp.token', 
            //    response.data.data.token,
            //    {
            //        maxAge:60*60*3, //duração do token de 3 horas
            //    }
            //)
            //Router.push('/principal');
            console.log('result Sucess: ',response.data);
        }else{
            //setUser(null)
            //setToken('')
            //alert('Email e/ou senha incorretos!');
            console.log('result Error: ',response.data);
        }
        

    }

    return(
        <AuthContext.Provider
        value={{ signed:!!user, user:user, signIn}}
      >  
        {children}
      </AuthContext.Provider>
    );
  }
  
export default AuthContext;
